const awsConfig = {
    Auth: {
      identityPoolId: import.meta.env.VITE_IDENTITY_POOL_ID, // Replace with your Identity Pool ID
      region: 'us-west-1', // Replace with your region
      userPoolId: import.meta.env.VITE_USER_POOL_ID, // Replace with your User Pool ID
      userPoolWebClientId: import.meta.env.VITE_USER_POOL_WEBCLIENT_ID, // Replace with your User Pool Web Client ID
    },
    Storage: {
      AWSS3: {
        bucket: 'mypokerbucket', // Replace with your S3 bucket name
        region: 'us-west-1', // Replace with your S3 bucket region
      },
    },
  };
  
  export default awsConfig;
  