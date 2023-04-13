import aws_cdk as core
import aws_cdk.assertions as assertions

from pani_one_app_src.pani_one_app_src_stack import PaniOneAppSrcStack

# example tests. To run these tests, uncomment this file along with the example
# resource in pani_one_app_src/pani_one_app_src_stack.py
def test_sqs_queue_created():
    app = core.App()
    stack = PaniOneAppSrcStack(app, "pani-one-app-src")
    template = assertions.Template.from_stack(stack)

#     template.has_resource_properties("AWS::SQS::Queue", {
#         "VisibilityTimeout": 300
#     })
