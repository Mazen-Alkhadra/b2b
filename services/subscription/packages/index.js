const SubscribeModel = require('../../../models').Subscription;

class Package {
  packageModel = SubscribeModel.Packages.create();

  async getAllFullInfo({ limit, skip, filters, sorts }) {
    return await this.packageModel.getAllFullInfo({
      limit, skip, filters, sorts
    });
  }

  async get ({ filters, sorts }) {
    return await this.packageModel.get ({ filters, sorts });
  }

  async addNew({
    nameEn, descriptionEn, priceUsd, imgUrl, 
    expirAt, validitySeconds, isActive
  }) {
    await this.packageModel.addNew({
      nameEn, descriptionEn, priceUsd, imgUrl, 
      expirAt, validitySeconds, isActive
    });
  }

  async update({
    idSubscriptionPackage, nameEn, descriptionEn, priceUsd, 
    imgUrl, expirAt, validitySeconds, isActive
  }) {
    await this.packageModel.update({
      idSubscriptionPackage, nameEn, descriptionEn, priceUsd, 
      imgUrl, expirAt, validitySeconds, isActive
    });
  }

  async delete({ idSubscriptionPackage }) {
    await this.packageModel.delete({ idSubscriptionPackage });
  }

}


module.exports = {
  create: () => new Package
};