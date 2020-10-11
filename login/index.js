const AWS = require('aws-sdk');
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });

exports.handler = async event => {
  const loginObj = event;
  const params = {
    ClientId: '3d2l582vk99pj870lfq4m42q31',
    AuthFlow: 'USER_PASSWORD_AUTH',
    AuthParameters: {
      USERNAME: loginObj.email,
      PASSWORD: loginObj.password
    }
  };
  let result = await cognitoidentityserviceprovider.initiateAuth(params).promise();

  let user = {};
  if (result.AuthenticationResult) {
    user['idToken'] = result.AuthenticationResult.IdToken;
    user['accessToken'] = result.AuthenticationResult.AccessToken;
    user['refreshToken'] = result.AuthenticationResult.RefreshToken;
  }

  if (result.err) {
    console.error('Error authenticating user in cognito ' + JSON.stringify(result.err));
    return result.err;
  } else {
    if (result.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
      return {
        message: 'new password required',
        code: 409,
        data: {
          user: {
            email: loginObj.email
          },
          session: result.Session
        }
      };
    } else {
      return {
        code: 200,
        message: 'login successful',
        user: user
      };
    }
  }
};
