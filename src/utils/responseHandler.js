const constants = require('./constants');

module.exports = {
  handleResponse(data, responseCode, errors) {
    var result = {};
    const statusCode = responseCode;

    if (statusCode >= 200 && statusCode < 300) {
      result = {
        status: constants.STATUS.SUCCESS,
        statusCode,
        data
      };
    }
    else {
      result = {
        status: constants.STATUS.FAILURE,
        statusCode,
        error: data
      };
    }
    return result;
  }
};
