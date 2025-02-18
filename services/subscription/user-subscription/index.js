const SubscribeModel = require('../../../models').Subscription;

class Package {
  userSubscribeModel = SubscribeModel.UserSubscription.create();

  async getAllFullInfo({ 
    limit, skip, filters, sorts, groupby,
    subscriptionId
   }) {
    return await this.userSubscribeModel.getAllFullInfo({
      limit, skip, filters, sorts, groupby,
      subscriptionId
    });
  }

  async get ({ userId, sorts }) {
    return await this.userSubscribeModel.get ({ userId, sorts });
  }

  async addNew({
    userId, subscriptionPackageId, paymentId, promotionId,
    promotionCode, expirAt, actualCostUsd, isActive
  }) {
    promotionCode = promotionCode || null;
    return await this.userSubscribeModel.addNew({
      userId, subscriptionPackageId, paymentId, promotionId,
      promotionCode, expirAt, actualCostUsd, isActive
    });
  }

  async update({
    idSubscription, userId, subscriptionPackageId, paymentId,
    promotionId, promotionCode, expirAt, actualCostUsd, isActive
  }) {
    promotionCode = promotionCode || null;
    await this.userSubscribeModel.update({
      idSubscription, userId, subscriptionPackageId, paymentId,
      promotionId, promotionCode, expirAt, actualCostUsd, isActive
    });
  }

  async delete({ idSubscription }) {
    await this.userSubscribeModel.delete({ idSubscription });
  }

}


module.exports = {
  create: () => new Package
};