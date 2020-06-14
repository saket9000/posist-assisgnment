const STATUS = Object.freeze({
    SUCCESS: true,
    FAILURE: false
  });
  
const STATUS_CODES = Object.freeze({
  OK: 200,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  NOT_ACCEPTABLE: 406,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  UNPROCCESSABLE_ENTITY: 422,
  SERVER_ERROR: 500
});

const MESSAGES = Object.freeze({
  ERROR: 'Some error occured, please try again after some time',
  SUCCESS: 'Success',
  ACCOUNT_ALREADY_EXIST: 'User with this email already exist',
  SIGN_UP_SUCCESSFULL: 'You are registered successfully, now you can login into your account',
  UNAUTHORIZED: 'Unauthorized request, please login first.',
  FORBIDDEN: 'Your account is blocked, please contact admin.',
  USER_NOT_EXIST: 'User with this email ID does not exist',
  PASSWORD_MISMATCHED: 'Password is not correct',
  CHANNEL_ALREADY_EXIST: 'Channel with this name already exist',
  CHANNEL_CREATED: 'Chanel created.'
});

module.exports = {
  STATUS,
  MESSAGES,
  STATUS_CODES
};