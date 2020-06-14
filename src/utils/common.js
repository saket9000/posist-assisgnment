const crypto = require('crypto');


function generateToken() {
    return crypto.randomBytes(64).toString('base64').replace(/\//g, '_').replace(/\+/g, '-');
  }

module.exports = {
    generateToken
};
