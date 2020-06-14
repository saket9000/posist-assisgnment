const PostService = require('../services/post');
const Post = require('../models/post');


class PostController {
  constructor() {
    this.service = service;
    this.create = this.create.bind(this);
    this.search = this.search.bind(this);
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
      var result = await PostService.create(
        body.channel, body.description
      );
      return response.status(result.statusCode).send(result);
    }
  }

  async search(req, res) {
    const { body } = request;
    var result = await PostService.search(
      body.channel, body.description
    );
    return response.status(result.statusCode).send(result);
  }
}

module.exports = new PostController;
