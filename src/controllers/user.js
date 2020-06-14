const User = require('../models/user');
const Region = require('../models/region')
const UserService = require('../services/user');

class UserController {
  constructor() {
    this.singup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async signup(req, res) {
    if (req.method == 'GET') {
      const dict = {
        region: await Region.find({ isActive: true }),
        statusCode: 200
      };
      console.log(dict);
      res.render('register', dict);
    }
    else {
      const { body } = req;
      var result = await UserService.signup(
        body.email, body.password, body.username, body.region
      );
      if (result.statusCode === 200) {
        res.render('login')
      }
      result.region = await Region.find({ isActive: true });
      res.render('register', result);
    }
  }

  async login(req, res) {
    if (req.method == 'GET') {
      res.render('login');
    }
    else {
      const { body } = req;
      var result = await UserService.login(body.email, body.password);
      req.session.user = await result.data;
      return res.status(result.statusCode).send(result);
    }
  }

  async logout(req, res) {
    await req.session.destroy(function(err) {
      res.redirect('login');
    });
  }
}

module.exports = new UserController;
