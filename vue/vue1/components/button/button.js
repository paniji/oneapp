// import Button from '../button/button.js'

export default {
    name: 'Button',
    // components: {
    //   Button
    // },
    template: `
    <button @click="handleClick" :class="btnClass">{{ label }}</button>
    `,
    data() {
        return {
            isCollapsed: false,
        }
    },
    props: {
        label: {
          type: String,
          required: true
        },
        btnClass: {
          type: String,
          default: ''
        }
      },
    methods: {
        handleClick() {
            var apigClient = apigClientFactory.newClient();

            var params = {
                // //This is where any header, path, or querystring request params go. The key is the parameter named as defined in the API
                //param0: 'test',
                // param1: ''
            };
            var body = {
                //This is where you define the body of the request
                param0: 'test'
            };
            var additionalParams = {
                // //If there are any unmodeled query parameters or headers that need to be sent with the request you can add them here
                // headers: {
                //     param0: '',
                //     param1: ''
                // },
                // queryParams: {
                //     param0: '',
                //     param1: ''
                // }
            };
            
            apigClient.oneappV1CorePost(params, body, additionalParams)
                .then(function(result){
                    console.log('This is where you would put a success callback')
                }).catch( function(result){
                    console.log('This is where you would put an error callback')
                });            
            // Attempt 2 with aws-sdk-js
            // // Set up AWS SDK configuration
            // AWS.config.update({
            //     region: 'us-east-1', // Replace with your desired AWS region
            //     credentials: new AWS.Credentials({
            //     // Provide short-term credentials or an access token
            //     accessKeyId: 'ASIAUXAEA2SOULGHQGPN', // Replace with your actual access key ID
            //     secretAccessKey: '+ZBU2V54IeJPsVWq+uZJAAV2Ro/M85v0Qq7UD2nz', // Replace with your actual secret access key
            //     sessionToken: 'IQoJb3JpZ2luX2VjEID//////////wEaCXVzLWVhc3QtMSJGMEQCIH86kRIjjYDB83stFnysFulLzrcsnQMGfFDeRU4Sq4IuAiBOAMyvBosxCdL2sl+TQMnl09A//Xo7W+fp+SuhiipCIyrlAgh4EAMaDDMyNDI3ODQ3Mzg4NSIMUS82j4mFGw0kDNgaKsICfxmukITTQp3o92LI20cHbrOo2LO6vevhNE7oxxdKve+4CgjaKsfRDdgiLqxP6mCDbKbvFA45rUveh0o0STnq1f4rEbVJ5aUJj6F7jBEP9cKd63HsrCAnU1MsXyLtwW2RtXxCYyg2a/Frtm73CQx9QrLaAZ3/bN1NWRS0Q20sZLcyo2o2fiTRnTTZwUwfLykhWCpQX0hm7W4EhfpShlqojoajnkhZYDQBgyNf5R6BnVhI5khApt5gX5HIGv6CXfq7uvOZXPIukkmjkYDOYk5TIVOBZo8fLOXLi9+8PExS1qVt8197cS74cTLD4/+F24miIEmdGM2dYUEcpgXw9MOLVvjEzGj1690Bp/t5MIBjmmFmBUnZffyBxy5nAD0XX/iuSAZsTFACW8EyZACE9J0kTyenebYe8jJxC19EtI/EFl3hjjCziYCiBjqoAWP1vFewh8eK7O2KuAj/ebwJhM+/c+B23Ww8bVBPZCvXOYyuNuezWw4SHxr66wG9dD/EkI2jfhAQZ8ljpMjxf28LMVwtq2vJzDKFlqjAmWNBzvB1hT12b3Ysx1L4bWBg/igdk5smPDGVHTXXpi8Jpn5815u6lQF3+gPkXCP2TLLDIRWlIbatZNcdvodOLbjgt3Fps3PC/uytrNvyzP9LoK88ERHTMoxToQ==', // Replace with your actual session token (if using short-term credentials)
            //     }),
            // });
            
            // // Set up the request parameters
            // const endpoint = GlobalEndPoint;
            // const method = 'OPTIONS';
            // const body = JSON.stringify({ key: 'value' });
            
            // // Generate the AWS Signature V4
            // const request = new AWS.HttpRequest(new AWS.Endpoint(endpoint), AWS.config.region);
            // request.method = method;
            // request.path = endpoint;
            // request.body = body;
            // request.headers['Content-Type'] = 'application/json'; 
            // //request.headers['Access-Control-Allow-Origin'] = '*';
            // //request.headers['Access-Control-Request-Private-Network'] = true;
            // request.headers['Accept'] = 'application/json';
            // request.headers['Host'] = request.endpoint.host;
            // request.headers['X-Amz-Date'] = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
            // request.headers['Authorization'] = AWS.util.crypto
            //     .sha256(request.headers['X-Amz-Date'], 'hex')
            //     .toString();
            // const signer = new AWS.Signers.V4(request, 'execute-api');
            // signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());
            
            // // Set up the axios request
            // axios({
            //     method: method,
            //     url: endpoint,
            //     headers: request.headers,
            //     data: body,
            //     //withCredentials: true,
            // })
            //     .then(response => {
            //     console.log(response.data);
            //     })
            //     .catch(error => {
            //     console.error(error);
            //     });

        // #### Attemp 1 with aws4 CDN export issue //
        // // Handle button click event here
        //     console.log('Button clicked');
        // // Define your AWS API Gateway endpoint and IAM authorization credentials
        //     const endpoint = GlobalEndPoint; // Replace <api-gateway-id> and <aws-region> with your actual values
        //     const accessKeyId = 'ASIAUXAEA2SORQPDMU4F'; // Replace <your-access-key-id> with your actual AWS access key ID
        //     const secretAccessKey = 'VOQhx+mvVk2okLJALRI4GvOwnJeDmOS3qjUVmdMP'; // Replace <your-secret-access-key> with your actual AWS secret access key
        //     const sessionToken = 'IQoJb3JpZ2luX2VjEFoaCXVzLWVhc3QtMSJHMEUCIQC5JvcTY8reOzYnhRibivyr/PL8tB+dEZC44gqH6dJu2gIgLqCRBX2wHb/0p75CIEcC6j+yNQT8gpneEG+urIvklyEq5QIIUxADGgwzMjQyNzg0NzM4ODUiDHcPzxOcxtCZGDA7kyrCAqbjqyORj1uj6bnB1S3ZX/ZHPCTYA39wVayPwoMLZeSxJl3ngISSxLitlS2tn1OhPn80GWZ9xWU47gkubj4RbkXFxsPlXG8ttMSq/d+OGqeGaY+aZIEyVDBAx7hvsLHWs5hc+jT74+N1WNAawqgVfD6qIgrhu5nGGeIPWbBrssleqm0wIeesr0YtZSmjIPx8ZubSct5OUp3lCweBLvgxpsMyBRb/HoUUED8T+/dPqXO5nji475e9xKy4C7UnGOfecu4AbBpO/ne90sboqKZdorTTJ9xHvY/RLixCY4B3VqtMQW3nbvPMpHPmbgCHGi2kpHWg0y3IPD+rcfrROqP/EddQgBK8B63ZKcyRpdRzpiqVeuVmBoL7DAJwiMpr5tZ47Bekas0AROTt6TZi+kEuohKMhvcrsy8sGSFDtjJrw4vC0gEwsur3oQY6pwEcEZLwS+M8ioinzJfIEl95PsGpyq9SvXjir0pAPUn7NAX6Unmpm7JZubpDhTVSfwpTD/xVRBKKvC+O2p3YeUO+3VUCmCcaq3QKXT+jviaTTMaaJojHN4Rum4qS3UWFATVdDa07bN8jKScxvugtP7k5quumsCbFeDHwvl9I10ATKerumuj1gALMiABSt2LTjpFPUcNVS4ezmKT8JGNknGOJim9GzUMmfg=='; // Replace <your-session-token> with your actual AWS session token, if applicable
        //   // Create an Axios instance with default configuration
        //     // const instance = axios.create({
        //     //     baseURL: GlobalEndPoint, // Set your base URL here
        //     // });

        //     // Set the request headers for the AWS Signature Version 4 signing process
        //     const headers = {
        //         'Content-Type': 'application/json', // Set the content type of your request, e.g. 'application/json'
        //     };
            
        //     // Make the request with Axios
        //     axios.get(`${endpoint}/prod`, {
        //         headers: headers,
        //         // Use the `aws4` package to sign the request with AWS Signature Version 4
        //         transformRequest: [(data, headers) => {
        //         const signedRequest = aws4.sign({
        //             method: 'GET', // Set the HTTP method of your request, e.g. 'GET'
        //             url: `${endpoint}/oneapp/v1/core`, // Set the URL of your AWS API Gateway resource
        //             headers: headers,
        //             service: 'execute-api',
        //             path: '/oneapp/v1/core',
        //             region: 'us-east-1', // Replace <aws-region> with your actual AWS region
        //             accessKeyId: accessKeyId,
        //             secretAccessKey: secretAccessKey,
        //             sessionToken: sessionToken,
        //         });
        //         return signedRequest;
        //         }],
        //     })
        //     .then(response => {
        //         // Handle the response
        //         console.log(response.data);
        //     })
        //     .catch(error => {
        //         // Handle the error
        //         console.error(error);
        //     });
        
        // Basic 1 //
        //   axios.get(GlobalEndPoint) // Replace with your API endpoint
        //   .then(response => {
        //     //this.posts = response.data; // Update the posts data in the component with the retrieved data
        //     console.log(response.data)
        //   })
        //   .catch(error => {
        //     console.error('Error fetching posts:', error);
        //   });
        }
      },
    mounted() {
        console.log('Sidebar component mounted.')
    },
    styles: `
    <style>

  </style>
  `
};
