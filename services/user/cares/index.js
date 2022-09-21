const UserModel = require('../../../models').User;

class UserCare {
  careModel = UserModel.Cares.create();

  async getAllFullInfo({ 
    limit, skip, filters, sorts,
    idUser
  }) {
    return await this.careModel.getAllFullInfo({
      limit, skip, filters, sorts, idUser
    });
  }

  async get ({ userId }) {
    return await this.careModel.get({ userId });
  }

  async resetUserCares({
    userId, cares
  }) {
    await this.careModel.resetUserCares({
      userId, cares
    });
  }
}


module.exports = {
  create: () => new UserCare
};