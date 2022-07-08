const SubscribeModel = require('../../../models').Subscription;

class Package {
  userSubscribeModel = SubscribeModel.UserSubscription.create();

  async getAllFullInfo({ limit, skip, filters, sorts }) {
    return await this.userSubscribeModel.getAllFullInfo({
      limit, skip, filters, sorts
    });
  }

  async addNew({
    userId, subscriptionPackageId, paymentId, promotionId,
    expirAt, actualCostUsd, isActive
  }) {
    await this.userSubscribeModel.addNew({
      userId, subscriptionPackageId, paymentId, promotionId,
      expirAt, actualCostUsd, isActive
    });
  }

  async update({
    idSubscription, userId, subscriptionPackageId, paymentId,
    promotionId, expirAt, actualCostUsd, isActive
  }) {
    await this.userSubscribeModel.update({
      idSubscription, userId, subscriptionPackageId, paymentId,
      promotionId, expirAt, actualCostUsd, isActive
    });
  }

  async delete({ idSubscription }) {
    await this.userSubscribeModel.delete({ idSubscription });
  }

}


module.exports = {
  create: () => new Package
};