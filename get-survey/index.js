const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({});

exports.handler = async event => {
  console.log('event', event);

  let scanningParameter = {
    TableName: 'survey',
    Limit: 100
  };

  try {
    let result = await docClient.scan(scanningParameter).promise();
    console.log('data', result);
    return {
      code: 200,
      surveys: result
    };
  } catch (error) {
    console.log('error', error);
    return {
      code: 500,
      error: error
    };
  }
};
