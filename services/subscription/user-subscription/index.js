const SubscribeModel = require('../../../models').Subscription;

class Package {
  userSubscribeModel = SubscribeModel.UserSubscription.create();

  async getAllFullInfo({ limit, skip, filters, sorts, groupby }) {
    return await this.userSubscribeModel.getAllFullInfo({
      limit, skip, filters, sorts, groupby
    });
  }

  async get ({ userId }) {
    return await this.userSubscribeModel.get ({ userId });
  }

  async addNew({
    userId, subscriptionPackageId, paymentId, promotionId,
    promotionCode, expirAt, actualCostUsd, isActive
  }) {
    await this.userSubscribeModel.addNew({
      userId, subscriptionPackageId, paymentId, promotionId,
      promotionCode, expirAt, actualCostUsd, isActive
    });
  }

  async update({
    idSubscription, userId, subscriptionPackageId, paymentId,
    promotionId, promotionCode, expirAt, actualCostUsd, isActive
  }) {
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