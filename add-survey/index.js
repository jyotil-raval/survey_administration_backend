const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({});

exports.handler = async event => {
  let param = {
    Item: event,
    TableName: 'survey'
  };

  try {
    let result = await docClient.put(param).promise();
    return {
      code: 200,
      error: result
    };
  } catch (error) {
    return {
      code: 500,
      surveys: error
    };
  }
};
