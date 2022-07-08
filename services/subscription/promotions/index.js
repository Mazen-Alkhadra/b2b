const SubscribeModel = require('../../../models').Subscription;

class Package {
  promotionModel = SubscribeModel.Promotions.create();

  async getAllFullInfo({ limit, skip, filters, sorts }) {
    return await this.promotionModel.getAllFullInfo({
      limit, skip, filters, sorts
    });
  }

  async addNew({
    code, descriptionEn, type, startAt, endAt,
    discountUsd, isActive
  }) {
    await this.promotionModel.addNew({
      code, descriptionEn, type, startAt, endAt,
      discountUsd, isActive
    });
  }

  async update({
    idPromotion, code, descriptionEn, type, startAt,
    endAt, discountUsd, isActive
  }) {
    await this.promotionModel.update({
      idPromotion, code, descriptionEn, type, startAt,
      endAt, discountUsd, isActive
    });
  }

  async delete({ idPromotion }) {
    await this.promotionModel.delete({ idPromotion });
  }

}


module.exports = {
  create: () => new Package
};