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

  async get ({ userId, sorts }) {
    return await this.careModel.get({ userId, sorts });
  }

  async resetUserCares({
    userId, cares
  }) {
    await this.careModel.resetUserCares({
      userId, cares
    });
  }

  async add ({ userId, categoryId, brandId, productId }) {
    await this.careModel.add ({ userId, categoryId, brandId, productId });
  }

  async delete ({ idUserCare }) {
    await this.careModel.delete ({ idUserCare });
  }

}


module.exports = {
  create: () => new UserCare
};