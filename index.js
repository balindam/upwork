const AWS = require('aws-sdk');

// Configure AWS SDK with your credentials
AWS.config.update({
  accessKeyId: '',
  secretAccessKey: '',
  region: 'ap-south-1'
});

// Create an S3 instance
const s3 = new AWS.S3();

// Specify your bucket name and prefix
const bucketName = 'upwork-balindam-doug';
const prefix = 'saml';

// Function to list objects with a given prefix in an S3 bucket
async function listObjects() {
  try {
    const params = {
      Bucket: bucketName,
      Prefix: prefix
    };

    // Use the listObjectsV2 method to get the objects with the specified prefix
    const data = await s3.listObjectsV2(params).promise();

    // Display the list of objects
    console.log('Objects in', bucketName, 'with prefix', prefix, ':');
    data.Contents.forEach(obj => {
      console.log(obj.Key);
    });
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}

// Lambda handler
exports.handler = async (event) => {
  try {
    // Call the function to list objects
    await listObjects();
    
    const response = {
      statusCode: 200,
      body: JSON.stringify('Hello from Lambda!'),
    };
    
    return response;
  } catch (error) {
    console.error('Lambda execution error:', error);
    throw error; // Rethrow the error to log and potentially handle it at a higher level
  }
};
