const SubscribeModel = require('../../../models').Subscription;

class Feature {
  featureModel = SubscribeModel.Features.create();

  async getAllFullInfo({ limit, skip, filters, sorts }) {
    return await this.featureModel.getAllFullInfo({
      limit, skip, filters, sorts
    });
  }

  async addNew({
    idSubscriptionFeature, nameEn, descriptionEn
  }) {
    await this.featureModel.addNew({
      idSubscriptionFeature, nameEn, descriptionEn
    });
  }

  async update({
    idSubscriptionFeature, nameEn, descriptionEn
  }) {
    await this.featureModel.update({
      idSubscriptionFeature, nameEn, descriptionEn
    });
  }

  async delete({ idSubscriptionFeature }) {
    await this.featureModel.delete({ idSubscriptionFeature });
  }

}


module.exports = {
  create: () => new Feature
};