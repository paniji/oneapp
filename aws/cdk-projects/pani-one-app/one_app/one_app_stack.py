from aws_cdk import (
    # Duration,
    Stack,
    # aws_sqs as sqs,
)
from constructs import Construct

import aws_cdk as cdk_
import os
import datetime
from one_app.sls.utils import utils
from one_app.sls.dydb.dynamodb import dyndb
import aws_cdk.aws_cloudformation as cloudformation
from aws_cdk import CustomResource

from aws_cdk import (aws_apigateway as apigateway_, Duration,
                     aws_certificatemanager as acm_,
                     aws_ec2 as ec2_,
                     aws_lambda as lambda_,
                     aws_iam as _iam,
                     custom_resources as _cr)

from aws_cdk import (
    Stack,
    aws_certificatemanager as acm,
    aws_route53 as route53,
    aws_lambda as _lambda,
    aws_ssm as ssm_,
    #aws_lambda_python_alpha as lambda_python,
    aws_route53_targets as targets,
)

class OneAppStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # bootstrap_lambda_role = ssm_.StringParameter.from_string_parameter_attributes(self, "BootstrapLambdaRole",
        #     parameter_name="/bootstrap/oneapp/BootstrapLambdaRoleArn"
        # ).string_value

        #print("Info: Context: ", self.node.try_get_context("depl_from"))
        project_name = self.node.try_get_context("product_name")
        lambda_role = self.node.try_get_context("lambda_role")
        env = self.node.try_get_context("env") 
        config_file = self.node.try_get_context("config_file")
        
        config_file = 'config.yml'
        lambda_role = 'BootstrapLambdaRole'

        rs_dict = {}
        def fn_put_dict(key, value):
            rs_dict[key] = value

        rs_ent = {}
        def fn_put_ent(key, value):
            rs_ent[key] = value

        
        config = utils.fn_load_config(config_file)

        depl_from = "cdk"

            
        sl = config["serverless"]
        role_ = utils.fn_cdk_role(self)

        # Load objects
        api_name = sl["name"]
        try:
            gw = sl["apigw"]
            api_name = gw['name']
        except:
            print("no API Gateway")

        #print(gw)
        try:
            stage = gw["stageOptions"]
        except:
            print("no API Gateway Stage")

        dydb_flag = ""
        if not utils.fn_try(sl, "dynamodb") == 'E':
            dydb_flag = True


        # Create domain and API GW 3
        try:

            deploy_options=apigateway_.StageOptions(
                logging_level=utils.fn_log_level(stage["loggingLevel"]), # INFO, ERROR, OFF
                data_trace_enabled=stage["dataTraceEnabled"],
                stage_name=env
                #tracing_enabled=True
            )

            api_gw = apigateway_.RestApi(self, api_name,
                                rest_api_name=api_name,
                                deploy_options=deploy_options,
                                endpoint_configuration=utils.fn_endpoint(gw["endpoint"])
                            )
            cdk_.Tags.of(api_gw).add("test", "exempt")
        except:
            print("Error: no domain")

        # Usage Plan
        # try:
        #     usage = gw["usagePlan"]
        #     try:
        #         apikey = gw["apiKey"]
        #         apikey_bl = True
        #     except:
        #         apikey_bl = False
        #         print("no API Key")

        #     if utils.fn_throttle(usage) == True:
        #         plan = api_gw.add_usage_plan("UsagePlan",
        #                             name=usage["name"],
        #                             throttle=apigateway_.ThrottleSettings(
        #                                 rate_limit=usage["throttle"]["rateLimit"],
        #                                 burst_limit=usage["throttle"]["burstLimit"]
        #                             )
        #                         )
        #     else:
        #         plan = api_gw.add_usage_plan("UsagePlan",
        #                             name=usage["name"],
        #                         )
        #     key = api_gw.add_api_key(apikey["name"])
        #     plan.add_api_key(key)

        #     plan.add_api_stage(
        #                 stage=api_gw.deployment_stage
        #                 )
        # except:
        #     print("no usage plan")

        datex = datetime.datetime.now()
#        try:
        fns = sl["functions"]
        #print(fns)
        for key in fns:
            #print("Info: Lambda: ", key)
            lambdaObj = fns[key] #["code"]

            fn_zip = os.path.dirname(os.path.realpath(__file__)) + '/'+ lambdaObj["package"]["artifact"]

            Fn = lambda_.Function(self, lambdaObj["name"],
                function_name=lambdaObj["name"],
                code=lambda_.Code.from_asset(fn_zip),
                handler=lambdaObj["handler"],
                runtime=utils.fn_runtime(lambdaObj["runtime"]),
                memory_size=lambdaObj["memory"],
                timeout=Duration.seconds(lambdaObj["timeout"]),
                role=role_,
                tracing=lambda_.Tracing.ACTIVE,
                current_version_options=lambda_.VersionOptions(
                        removal_policy=cdk_.RemovalPolicy.RETAIN,  # retain old versions
                        retry_attempts=1
                        ),
                environment={
                    "CodeVersionString": str(datex)
                },
            )

            #print("Function_Inst: ", Fn)

            try: 
                lenv_ = lambdaObj["environment"]
                for envv in lenv_:
                    Fn.add_environment(envv, lenv_[envv])
            except:
                print("no function env var: ", key)

            try:
                tags_ = lambdaObj["tags"]
                for tag in tags_:
                    cdk_.Tags.of(Fn).add(tag, tags_[tag])
            except:
                print("no function tags: ", key)

            if utils.fn_auth(fns[key]) == True:
                if not utils.fn_try(gw, "identitySource") == 'E':  
                    idsource = []                  
                    for id in gw["identitySource"]:
                        idsource.append(apigateway_.IdentitySource.header(id))
                    #print(idsource)

                print("Lambda Authorizer: ", key)
                if not utils.fn_try(gw, "authType") == 'E':
                    #print(gw["authType"])
                    if gw["authType"] == "Request":
                        auth = apigateway_.RequestAuthorizer(self, "Authorizer",
                            handler=Fn,
                            identity_sources=idsource
                        )
                    else:
                        auth = apigateway_.TokenAuthorizer(self, "Authorizer",
                            handler=Fn,
                            identity_sources=idsource
                        )                            
                else:
                    auth = apigateway_.TokenAuthorizer(self, "Authorizer",
                        handler=Fn,
                        identity_sources=idsource
                    )

                    apigateway_.AuthorizationType.IAM

            #print(fns[key]["events"])
            try:
                events = fns[key]["events"]
                #print(events)
            #    #utils.fn_events(self, events, Fn, auth, fns, key)
                for event in events:
                    rs_path = event["http"]["path"]
                    ar_path = rs_path.split("/")
                    for index, item in enumerate(ar_path):
                        val = rs_path + "/" + str(index)
                        
                        if index == 0:
                            if not rs_dict.get(item):
                                api_gw_entity_root = api_gw.root.add_resource(item)
                                fn_put_dict(item, val)
                        elif index == 1:
                            if not rs_dict.get(item):
                                api_gw_entity_v = api_gw_entity_root.add_resource(item)
                                fn_put_dict(item, val)
                        elif index == 2:
                            if not rs_dict.get(item):
                                api_gw_entity = api_gw_entity_v.add_resource(item)
                                fn_put_ent(rs_path, api_gw_entity)
                                fn_put_dict(item, val)
                            
                            try:
                                resp = event["http"]["response"]
                                
                                try:
                                    req = event["http"]["request"]
                                    lambda_integration = apigateway_.LambdaIntegration(
                                            Fn,
                                            proxy=False,
                                            passthrough_behavior=apigateway_.PassthroughBehavior.WHEN_NO_TEMPLATES,
                                            request_templates=req["template"],
                                            integration_responses=utils.fn_response(resp),
                                            #connection_type=apigateway_.ConnectionType.VPC_LINK,
                                            #vpc_link=link
                                        )
                                except:
                                    print("Info: no request template")
                                    lambda_integration = apigateway_.LambdaIntegration(
                                            Fn,
                                            proxy=False,
                                            passthrough_behavior=apigateway_.PassthroughBehavior.WHEN_NO_TEMPLATES,
                                            integration_responses=utils.fn_response(resp)
                                        )                                        
                            except:
                                print("no response: ", key)

                            meth = event["http"]["method"]

                            api_gw_entity.add_cors_preflight=apigateway_.CorsOptions(
                                                            #allow_methods=["GET", "PUT", "POST"],
                                                            allow_origins=apigateway_.Cors.ALL_ORIGINS,
                                                            allow_headers= ['Content-Type','X-Amz-Date','Authorization','X-Api-Key','X-Amz-Security-Token'])   #apigateway_.Cors.DEFAULT_HEADERS)

                            try:
                                auth_true = event["http"]["authorizer"]
                                #print("auth: ", key)
                                api_meth = rs_ent.get(rs_path).add_method(
                                meth.upper(), lambda_integration,
                                #authorizer=auth,
                                authorization_type=apigateway_.AuthorizationType.IAM,
                                #api_key_required=apikey_bl,
                                method_responses=[{
                                        'statusCode': '200',
                                        'responseParameters': {
                                            'method.response.header.Access-Control-Allow-Origin': True,
                                        }
                                    }]
                                )
                                
                            except:
                                #print("non-auth: ", key)
                                api_meth = rs_ent.get(rs_path).add_method(
                                    meth.upper(), lambda_integration,
                                    authorization_type=apigateway_.AuthorizationType.IAM,
                                    #api_key_required=apikey_bl,
                                    method_responses=[{
                                            'statusCode': '200',
                                            'responseParameters': {
                                                'method.response.header.Access-Control-Allow-Origin': True,
                                            }
                                        }]
                                    )

                            role_.attach_inline_policy(_iam.Policy(self, "AllowApiGatewayMethod",
                                statements=[
                                    _iam.PolicyStatement(
                                        actions=["execute-api:Invoke"],
                                        effect=_iam.Effect.ALLOW,
                                        resources=[api_meth.method_arn]
                                    )
                                ]
                            ))
            except:
                print("no events: ", key)

        # Create DynamoDB
        if not utils.fn_try(sl, "dynamodb") == 'E':
            dydb = utils.fn_try(sl, "dynamodb")
            dyndb.fn_table(self, dydb)

