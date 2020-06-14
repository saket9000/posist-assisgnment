const constants = require('../utils/constants');
const response = require('../utils/responseHandler');
const Channel = require('../models/channel');
const Region = require('../models/region');
const Post = require('../models/post');

module.exports = {
  async show(user) {
    let responseDict = {};

    try {
      // P2
      let trendingTags = await Channel.aggregate([
        {$unwind: '$tags'},
        {$group: {_id: '$_id', count: {$sum: 1}}},
        {$sort: { count: -1 }}
      ]).limit(5);
      // console.log(trendingTags, 'trending tags');
      // let trendingRegions = await Region.aggregate([
      //   {$unwind: '$users'},
      //   {$group: {_id: '$_id', count: {$sum: 1}}}
      // ]).limit(5);

      // let r = await Region.aggregate([
      //   { "$lookup": {
      //     "from": "users",
      //     "let": { "userId": "$_id" },
      //     "pipeline": [
      //       { "$match": { "$expr": { "$eq": ["$user", "$$userId"] } } }
      //     ],
      //     "as": "users"
      //   }}
      // ])

      let c = await Post.aggregate([
        {$unwind: '$channel'},
        {$group: {_id: '$_id', count: {$sum: 1}}}
      ]);
      // console.log(c, 'channels');

      // P3
      let r = await Region.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: '_id',
            foreignField: 'region',
            as: 'users'
          }
        }
      ]);
      // console.log(r, 'regions');
      responseDict = {
        message: constants.MESSAGES.CHANNEL_CREATED
      };
      return response.handleResponse(responseDict, constants.STATUS_CODES.OK);
    }
    catch (errors) {
      console.log(errors, 'errs');
      responseDict = {
        message: constants.MESSAGES.ERROR
      };
      return response.handleResponse(
        responseDict, constants.STATUS_CODES.SERVER_ERROR, __filename, errors
      );
    }
  }
}
