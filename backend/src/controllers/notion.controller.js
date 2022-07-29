const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const axios = require('axios');
const handleNotionCallback = async (token) => {
  const response = await axios.post(
    'https://api.notion.com/v1/oauth/token',
    {
      grant_type: 'authorization_code',
      code: token,
      redirect_uri: 'http://localhost:5000/v1/notion/call-back',
    },
    {
      headers: {
        authorization:
          'Basic OGRkNWQ3NzktYTA4YS00OGViLWJjZjktMzhhMTExNWIzYzhkOnNlY3JldF8xU0drRG5YSlB0Z0d2RE82V29WMEUzYXcwc0w2TzdXQzhFd1piYnQ3ajFB',
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'postman-token': '25e551e2-42b9-aa0a-8a05-ea24da507a01',
      },
    }
  );

  return response;
};
const handleCallback = catchAsync(async (req, res) => {
  console.log('handleCallback', req.query.code);
  const response = await handleNotionCallback(req.query.code);
  if (response.status === 200) {
    res.status(httpStatus.OK).json({
      status: 'success',
      data: response.data,
    });
  } else {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      data: 'Something went wrong',
    });
  }
});

module.exports = {
  handleCallback,
};
