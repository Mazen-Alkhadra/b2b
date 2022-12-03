const UserModel = require('../../models').User;
let HashSvc = require('../hash');
const Cares = require('./cares');
const Codes = require('./codes');

class User {
  userModel = UserModel.create();

  async getAllFullInfo({ 
    limit, skip, filters, sorts,
    onlyAdmins, careTenderId
  }) {
    return await this.userModel.getAllFullInfo({ 
      limit, skip, filters, sorts, onlyAdmins,
      careTenderId
    });
  }

  async getProfileInfo ({ userId }) {
    return await this.userModel.getProfileInfo({ userId });
  }

  async addNew({
    firstName, lastName, email, mobile, password, companyId,
    birthDate, gender, imgUrl, roleId, isBlocked, isActive,
    hasMobileWhatsapp, notes
  }) {
    mobile = this.fixMobile({number: mobile});
    return await this.userModel.addNew({
      firstName, lastName, email, mobile, password, companyId,
      birthDate, gender, imgUrl, roleId, isBlocked, isActive,
      hasMobileWhatsapp, notes
    });
  }

  async update({
    idUser, firstName, lastName, email, mobile, password, companyId,
    birthDate, gender, imgUrl, roleId, isBlocked, isActive,
    isAccepted, lastLoginAt, hasMobileWhatsapp, score, notes
  }) {
    password = await HashSvc.create().hash(password);
    mobile = this.fixMobile({number: mobile});
    
    await this.userModel.update({
      idUser, firstName, lastName, email, mobile, companyId,
      birthDate, gender, imgUrl, roleId, isBlocked, isActive,
      password, isAccepted, lastLoginAt, hasMobileWhatsapp, 
      score, notes
    });
  }

  async delete({ idUser }) {
    await this.userModel.delete({ idUser });
  }

  async accept ({ usersIds, isAccepted, notes }) {
    await this.userModel.accept({ usersIds, isAccepted, notes });
  }

  fixMobile({number}) {
    return this.userModel.fixMobile({number});
  }

}


module.exports = {
  create: () => new User,
  Cares,
  Codes
};