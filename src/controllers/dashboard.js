const DashboardService = require('../services/dashboard');
const Tag = require('../models/tag');
const User = require('../models/user');


class DashboardController {
  constructor() {
    this.show = this.show.bind(this);
  }

  async show(req, res) {
    const { body } = req;
    var result = await DashboardService.show(
      body.name, body.description, body.tags, body.users
    );
    return res.status(result.statusCode).send(result);
  }
}

module.exports = new DashboardController;
