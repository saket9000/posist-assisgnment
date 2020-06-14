const ChannelService = require('../services/channel');
const Tag = require('../models/tag');
const User = require('../models/user');


class ChannelController {
  constructor() {
    this.create = this.create.bind(this);
  }

  async create(req, res) {
    if (req.method == 'GET') {
      const dict ={
        tags: await Tag.find({ isActive: true }),
        users: await User.find({ isActive: true })
      };
      res.render('test', dict);
    }
    else {
      const { body } = request;
      var result = await ChannelService.create(
        body.name, body.description, body.tags, body.users
      );
      return response.status(result.statusCode).send(result);
    }
  }
}

module.exports = new ChannelController;
