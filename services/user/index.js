const UserModel = require('../../models').User;
let HashSvc = require('../hash');
const Cares = require('./cares');
const Codes = require('./codes');

class User {
  userModel = UserModel.create();

  async getAllFullInfo({ limit, skip, filters, sorts }) {
    return await this.userModel.getAllFullInfo({ 
      limit, skip, filters, sorts
    });
  }

  async addNew({
    firstName, lastName, email, mobile, password, companyId,
    birthDate, gender, imgUrl, roleId, isBlocked, isActive
  }) {
    await this.userModel.addNew({
      firstName, lastName, email, mobile, password, companyId,
      birthDate, gender, imgUrl, roleId, isBlocked, isActive
    });
  }

  async update({
    idUser, firstName, lastName, email, mobile, password, companyId,
    birthDate, gender, imgId, roleId, isBlocked, isActive,
    isAccepted, lastLoginAt
  }) {

    if(password)
      password = await HashSvc.create().hash(password);

    await this.userModel.update({
      idUser, firstName, lastName, email, mobile, companyId,
      birthDate, gender, imgId, roleId, isBlocked, isActive,
      password, isAccepted, lastLoginAt
    });
  }

  async delete({ idUser }) {
    await this.userModel.delete({ idUser });
  }

}


module.exports = {
  create: () => new User,
  Cares,
  Codes
};