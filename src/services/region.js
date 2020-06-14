import constants from '../utils/constants';
import response from '../utils/responseHandler';
import utils from '../common/utils';

class RegionService {
  constructor(model) {
    this.model = model;
  }

  async signup(email, password, username, region) {
    let responseDict = {};

    try {
      let user = await this.model.findOne({ email });
      if (user && !user.isActive) {
        responseDict = {
          message: constants.MESSAGES.FORBIDDEN
        };
        return response.handleResponse(responseDict, constants.STATUS_CODES.FORBIDDEN);
      }
      if (user === null) {
        user = await this.model.create({ email, password, username });
      }

      responseDict = {
        message: constants.MESSAGES.OTP_GENERATED
      };
      return response.handleResponse(responseDict, constants.STATUS_CODES.OK);
    }
    catch (errors) {
      responseDict = {
        message: constants.MESSAGES.ERROR_OCCURED
      };
      return response.handleResponse(
        responseDict, constants.STATUS_CODES.SERVER_ERROR, __filename, errors
      );
    }
  }
}

export default RegionService;
