const UserModel = require('../../../models').User;
const codeGenSvc = require('../../random-codes-generator');
const userCodesConfig = require('../../../config/server').usersCodes;
const EmailSvc = require('../../emailer');
const {ERR_NOT_EXISTS_USER_NAME} = require('../../../resources').errors.codes;

class UserCode {
  codeModel = UserModel.Codes.create();

  async getAllFullInfo({ limit, skip, filters, sorts }) {
    return await this.codeModel.getAllFullInfo({ 
      limit, skip, filters, sorts
    });
  }

  async addNew({
    userId, code, type, isActive, expiryDateTime
  }) {
    await this.codeModel.addNew({
      userId, code, type, isActive, expiryDateTime
    });
  }

  async update({
    idCode, userId, code, type, isActive, expiryDateTime
  }) {
    await this.codeModel.update({
      idCode, userId, code, type, isActive, expiryDateTime
    });
  }

  async consume ({ code }) {
    await this.codeModel.consume({ code });
  }

  async genActivationCode({userId}) {
    let code = codeGenSvc.create().generate();

    await this.addNew({
      userId, code, 
      isActive: true,
      type: UserModel.Codes.CODES_TYPE.ACTIVATE,
      expiryDateTime: 
        new Date(Date.now() + userCodesConfig.activationCodeAge).toISOString()
    });

    let {firstName, lastName, email} = 
      await UserModel.create().findUser({userId});
    
    EmailSvc.create().sendActivationCode(firstName, lastName, email, code);
  }

  async genResetPasswordCode({loginName}) {
    let {idUser, firstName, lastName, email} = 
      await UserModel.create().findUser({loginName});

    if(!idUser) 
      throw {message: ERR_NOT_EXISTS_USER_NAME};
      
    let code = codeGenSvc.create().generate();

    await this.addNew({
      code, 
      userId: idUser, 
      isActive: true,
      type: UserModel.Codes.CODES_TYPE.RESET_PASS,
      expiryDateTime: 
        new Date(Date.now() + userCodesConfig.resetPasswordCodeAge).toISOString()
    });
    
    EmailSvc.create().sendResetPasswordLink(firstName, lastName, email, code);
  }

  async delete({ idCode }) {
    await this.codeModel.delete({ idCode });
  }

}


module.exports = {
  create: () => new UserCode
};