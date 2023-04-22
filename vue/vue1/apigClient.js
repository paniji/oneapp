/*
 * Copyright 2010-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var apigClientFactory = {};
apigClientFactory.newClient = function (config) {
    var apigClient = { };
    if(config === undefined) {
        config = {
            accessKey: 'ASIAUXAEA2SOT5NYBT4E',
            secretKey: 'sAZdIl1vGz+BHPGVzxXV8SKl+6PNSpgCsIfw7zgi',
            sessionToken: 'IQoJb3JpZ2luX2VjELr//////////wEaCXVzLWVhc3QtMSJIMEYCIQDjOscrpkqupAMV8rCPt73i8cgVrfYxbZCBYVklX7jT5gIhAJuW3NBN+Z2S202BFGIaTSneJjjxNtoLYd3POTnC7/CVKu4CCLP//////////wEQAxoMMzI0Mjc4NDczODg1IgzL2HaggYSBWSfYrN0qwgJMW7gEUCgCGbGWl5mAy7+JwsRJWU+OmekjQjW3haNObpJHYcDDwd6lc9xhGtyROc6fVlvJ+UHVK0ywiLpsLjYgET7clJzsQ/HbNkBI6Lk0dDUio5Kjd/uGY0N3a+GY6Rn82URkHtxCb8HQ3NG5ltux70M0pdc0AAynCujg1gbo2RMwDjIxzZAJ7pFZ0JAE+reo9RfyL2mQCYZ9+W4FN3RNIvf3NpOGclN3zi9bWeppL/Y/pZP7Q5LpAiXc9mtvCqQUdr7ncd84TJQHMNH18dkzvLmnoKowlr6+t1Ma+E6k+F7CILZCRGd8H4FYbb7YrKUzyAfRKit1hE3yJB1XEW4HWg0pqVPFALKQ+Gk5aROXeddJ0CrF2wI421ZFfHCVX/goqOSnnS05bGNltV0+7NUfA6DxByPuzY+5ee86QLNNDq0TMJDzjKIGOqYBMvoHVMjRZA4AQGLBJfyk1H6Mb3L9yiAG+ybAndrmtNVh9WMnxGsTuWNFg92WOvk7B+CpNoXhuWALZY2bXE1CVbwJ6NTmtkHGhYzlBytvZ24exjGuGwMOvB9JakQuBP5OKfo4Rwebh0ssfbd1jVSRaLblrLeGRjrBv1kWTTP2SRq7z3nu9L/zZfdq8Ipet8UZqDJGSDbTQP9ckCPYu7DFofmDP1jtag==',
            region: 'us-east-1',
            apiKey: undefined,
            defaultContentType: 'application/json',
            defaultAcceptType: 'application/json'
        };
    }
    if(config.accessKey === undefined) {
        config.accessKey = '';
    }
    if(config.secretKey === undefined) {
        config.secretKey = '';
    }
    if(config.apiKey === undefined) {
        config.apiKey = '';
    }
    if(config.sessionToken === undefined) {
        config.sessionToken = '';
    }
    if(config.region === undefined) {
        config.region = 'us-east-1';
    }
    //If defaultContentType is not defined then default to application/json
    if(config.defaultContentType === undefined) {
        config.defaultContentType = 'application/json';
    }
    //If defaultAcceptType is not defined then default to application/json
    if(config.defaultAcceptType === undefined) {
        config.defaultAcceptType = 'application/json';
    }

    
    // extract endpoint and path from url
    var invokeUrl = 'https://u7nwzvltkl.execute-api.us-east-1.amazonaws.com/prod';
    var endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
    var pathComponent = invokeUrl.substring(endpoint.length);

    var sigV4ClientConfig = {
        accessKey: config.accessKey,
        secretKey: config.secretKey,
        sessionToken: config.sessionToken,
        serviceName: 'execute-api',
        region: config.region,
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var authType = 'NONE';
    if (sigV4ClientConfig.accessKey !== undefined && sigV4ClientConfig.accessKey !== '' && sigV4ClientConfig.secretKey !== undefined && sigV4ClientConfig.secretKey !== '') {
        authType = 'AWS_IAM';
    }

    var simpleHttpClientConfig = {
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(simpleHttpClientConfig, sigV4ClientConfig);
    
    
    
    apigClient.oneappV1CorePost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var oneappV1CorePostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/oneapp/v1/core').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(oneappV1CorePostRequest, authType, additionalParams, config.apiKey);
    };
    

    return apigClient;
};
