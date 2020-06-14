const User = require('../models/user');
const response =  require('../utils/responseHandler');
const constants = require('../utils/constants');

function isAuthorized(req, res, next) {
  var responseDict = [];
  if (!req.session.user) {
    responseDict.push({
      message: constants.MESSAGES.UNAUTHORIZED
    });
    const resObj = response.handleResponse(
      responseDict, constants.STATUS_CODES.UNAUTHORIZED
    );
    res.render('login', resObj);
  }
  if (req.session.user && !req.session.user.isActive) {
    responseDict.push({
      message: constants.MESSAGES.FORBIDDEN
    });
    const resObj = response.handleResponse(
      responseDict, constants.STATUS_CODES.FORBIDDEN
    );
    res.render('login', resObj);
  }
  return next();
}

module.exports = isAuthorized;