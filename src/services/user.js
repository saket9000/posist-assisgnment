const constants = require('../utils/constants');
const common = require('../utils/common');
const response = require('../utils/responseHandler');
const User = require('../models/user');

module.exports = {
  async signup(email, password, username, region) {
    let responseDict = {};

    try {
      let user = await User.findOne({ email });
      if (user) {
        responseDict = {
          message: constants.MESSAGES.ACCOUNT_ALREADY_EXIST
        };
        return response.handleResponse(responseDict, constants.STATUS_CODES.FORBIDDEN);
      }
      user = await User.create({ email, password, username, region });
      responseDict = {
        message: constants.MESSAGES.SIGN_UP_SUCCESSFULL
      };
      return response.handleResponse(responseDict, constants.STATUS_CODES.OK);
    }
    catch (errors) {
      console.log(errors);
      responseDict = {
        message: constants.MESSAGES.ERROR_OCCURED
      };
      return response.handleResponse(
        responseDict, constants.STATUS_CODES.SERVER_ERROR, __filename, errors
      );
    }
  },
  async login(email, password) {
    let responseDict = {};

    try {
      let user = await User.findOne({ email });
      if (user && !user.isActive) {
        responseDict = {
          message: constants.MESSAGES.FORBIDDEN
        };
        return response.handleResponse(responseDict, constants.STATUS_CODES.FORBIDDEN);
      }
      if (user === null) {
        responseDict = {
          message: constants.MESSAGES.USER_NOT_EXIST
        };
        return response.handleResponse(responseDict, constants.STATUS_CODES.BAD_REQUEST);
      }

      const isPasswordValid = await User.comparePassword(password);
      if (!isPasswordValid) {
        responseDict = {
          message: constants.MESSAGES.PASSWORD_MISMATCHED
        };
        return response.handleResponse(responseDict, constants.BAD_REQUEST);
      }

      const token = await common.generateToken();

      // Add token
      user = await User.findOneAndUpdate(
        { email },
        { token },
        { $new: true }
      );
      return response.handleResponse(user, constants.STATUS_CODES.OK);
    }
    catch (errors) {
      responseDict = {
        message: constants.MESSAGES.ERROR
      };
      return response.handleResponse(
        responseDict, constants.STATUS_CODES.SERVER_ERROR, __filename, errors
      );
    }
  }
};
