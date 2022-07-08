const UserModel = require('../../../models').User;

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

  async delete({ idCode }) {
    await this.codeModel.delete({ idCode });
  }

}


module.exports = {
  create: () => new UserCode
};