#!/usr/bin/env python3
import os
import aws_cdk as cdk
#from pm_cdk_test1.pm_cdk_test1_stack import PmCdkTest1Stack
from pm_cdk_serverless.serverless import PmCdkServerlessStack

import files.aspect as _aspects

app = cdk.App()
_env = cdk.Environment(account=os.environ["CDK_DEFAULT_ACCOUNT"], region=os.environ["CDK_DEFAULT_REGION"])
_stack_name = app.node.try_get_context("product_name")
#print(_stack_name)
PmCdkServerlessStack(app, _stack_name,
    synthesizer=cdk.DefaultStackSynthesizer(
        # ARN of the role assumed by the CLI and Pipeline to deploy here
            deploy_role_arn="arn:${AWS::Partition}:iam::${AWS::AccountId}:role/cdk-${Qualifier}-deploy-role-${AWS::AccountId}-${AWS::Region}",
        # ARN of the role used for file asset publishing (assumed from the deploy role)
            file_asset_publishing_role_arn="arn:${AWS::Partition}:iam::${AWS::AccountId}:role/cdk-${Qualifier}-file-publishing-role-${AWS::AccountId}-${AWS::Region}",
        # ARN of the role used for Docker asset publishing (assumed from the deploy role)
            image_asset_publishing_role_arn="arn:${AWS::Partition}:iam::${AWS::AccountId}:role/cdk-${Qualifier}-image-publishing-role-${AWS::AccountId}-${AWS::Region}",
        # ARN of the role passed to CloudFormation to execute the deployments
            cloud_formation_execution_role="arn:aws:iam::${AWS::AccountId}:role/CloudFormationExecutionRole"
        ),
    env=_env,

    # For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html
    )

cdk.Aspects.of(app).add(_aspects.PactRoleName())
app.synth()
