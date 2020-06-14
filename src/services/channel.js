const constants = require('../utils/constants');
const response = require('../utils/responseHandler');
const Channel = require('../models/channel');

module.exports = {
  async create(name, description, tags, users) {
    let responseDict = {};

    try {
      let channel = await Channel.findOne({ name });
      if (channel) {
        responseDict = {
          message: constants.MESSAGES.CHANNEL_ALREADY_EXIST
        };
        return response.handleResponse(responseDict, constants.STATUS_CODES.FORBIDDEN);
      }
      channel = await Channel.create({ name, description, tags, users });
      responseDict = {
        message: constants.MESSAGES.CHANNEL_CREATED
      };
      return response.handleResponse(responseDict, constants.STATUS_CODES.OK);
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
}

