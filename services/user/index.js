const UserModel = require('../../models').User;
let HashSvc = require('../hash');
const Cares = require('./cares');
const Codes = require('./codes');
const SubscribeSvc = require('../subscription');

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
    birthDate, gender, imgUrl, roleId, isBlocked, notes,
    hasMobileWhatsapp, isMobileVerified, isEmailVerified
  }) {
    mobile = this.fixMobile({number: mobile});
    let userData = await this.userModel.addNew({
      firstName, lastName, email, mobile, password, companyId,
      birthDate, gender, imgUrl, roleId, isBlocked, notes,
      hasMobileWhatsapp, isEmailVerified, isMobileVerified
    });

    if(companyId) {
      SubscribeSvc.Packages.create().getDefaultPackageId()
      .then(defPackageId => {
        if(defPackageId)
          SubscribeSvc.UserSubscription.create().addNew({
            userId: userData.newId,
            subscriptionPackageId: defPackageId,
            actualCostUsd: 0
          });
      });
    }
      
    return userData;
  }

  async update({
    idUser, firstName, lastName, email, mobile, password, companyId,
    birthDate, gender, imgUrl, roleId, isBlocked, isMobileVerified,
    isEmailVerified, isAccepted, isAuthorized, lastLoginAt, 
    hasMobileWhatsapp, score, notes
  }) {
    password = await HashSvc.create().hash(password);
    mobile = this.fixMobile({number: mobile});
    
    await this.userModel.update({
      idUser, firstName, lastName, email, mobile, companyId,
      birthDate, gender, imgUrl, roleId, isBlocked, password, 
      isMobileVerified, isEmailVerified,  lastLoginAt, isAccepted,
      hasMobileWhatsapp, isAuthorized, score, notes
    });
  }

  async delete({ idUser }) {
    await this.userModel.delete({ idUser });
  }

  async softDelete({ idUser }) {
    await this.userModel.softDelete({ idUser });
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