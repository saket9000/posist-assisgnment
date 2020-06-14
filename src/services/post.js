const constants = require('../utils/constants');
const response = require('../utils/responseHandler');
const Post = require('../models/post');

module.exports = {
  async create(user, channel, description) {
    let responseDict = {};

    try {
      channel = await Post.create({ user, channel, description });
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
  },

  async search(channel, description) {
    let responseDict = {};

    try {
      post = await Post.find({
        $and:[
          {
            channel,
            description: {
              $regex: description
            }
          }
        ]
      });
      return response.handleResponse(post, constants.STATUS_CODES.OK);
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
