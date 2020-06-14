const express = require('express');
const UserController = require('../controllers/user');
const ChannelController = require('../controllers/channel');
const DashboardController = require('../controllers/dashboard');
const IsAuthorized = require('../middleware/authentication');

const router = express.Router();

router.get('/user/signup', UserController.signup);
router.post('/user/signup', UserController.signup);
router.get('/user/login', UserController.login);

router.use(IsAuthorized);

router.post('/user/login', UserController.login);
router.get('/user/logout', UserController.logout);
router.get('/channel/create', ChannelController.create);
router.post('/channel/create', ChannelController.create);
router.get('/dashboard', DashboardController.show);

module.exports = router;
