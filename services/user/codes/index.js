const UserModel = require('../../../models').User;
const codeGenSvc = require('../../random-codes-generator');
const userCodesConfig = require('../../../config/server').usersCodes;
const EmailSvc = require('../../emailer');
const SMSSvc = require('../../sms');
const {
  ERR_NOT_EXISTS_USER_NAME,
  ERR_INVALID_USER_CODE
} = require('../../../resources').errors.codes;
const validators = require('../../validators');

class UserCode {
  codeModel = UserModel.Codes.create();
  userModel = UserModel.create();

  async getAllFullInfo({ limit, skip, filters, sorts }) {
    return await this.codeModel.getAllFullInfo({ 
      limit, skip, filters, sorts
    });
  }

  async addNew({
    userId, loginName, code, type, isActive, expiryDateTime
  }) {
    await this.codeModel.addNew({
      userId, loginName, code, type, isActive, expiryDateTime
    });
  }

  async update({
    idCode, userId, loginName, code, type, isActive,
    expiryDateTime
  }) {
    await this.codeModel.update({
      idCode, userId, loginName, code, type, isActive, 
      expiryDateTime
    });
  }

  async consume ({ loginName, code }) {
   
    if(validators.isMobile(loginName))
      return await this.verifyMobile({
        mobileNumber: loginName,
        code, 
        isConsume: true
      });

    await this.codeModel.consume({ loginName, code });  
  }

  async genActivationCode({loginName}) {
    
    if(validators.isMobile(loginName))
     return this.verifyMobile({mobileNumber: loginName});
    
    let code = codeGenSvc.create().generate(5, codeGenSvc.CODES_TYPES.NUMERIC);

    await this.addNew({
      loginName,
      code, 
      isActive: true,
      type: UserModel.Codes.CODES_TYPE.ACTIVATE,
      expiryDateTime: 
        new Date(Date.now() + userCodesConfig.activationCodeAge).toISOString()
    });
    
    if(validators.isEmail(loginName))
      EmailSvc.create().sendActivationCode({
        userEMail: loginName, 
        activationCode: code
      });
  }

  async genResetPasswordCode({loginName}) {
    let {idUser, firstName, lastName, email, mobile} = 
      await this.userModel.findUser({loginName});

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
    this.verifyMobile({mobileNumber: mobile});
  }

  async delete({ idCode }) {
    await this.codeModel.delete({ idCode });
  }

  async verifyMobile({mobileNumber, code, isConsume}) {
    mobileNumber = this.userModel.fixMobile({number: mobileNumber});

    if(!isConsume) 
      return SMSSvc.create().sendVerify({ mobileNumber });

    
    let isValid = await SMSSvc.create().validateVerify({
      toNumber: mobileNumber, code
    });

    if(!isValid)
      throw {message: ERR_INVALID_USER_CODE};

    let {idUser} = await this.userModel.findUser({loginName: mobileNumber});
    await this.userModel.update({idUser, isActive: true});
    return {idUser};
  }

}


module.exports = {
  create: () => new UserCode
};