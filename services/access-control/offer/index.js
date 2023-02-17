const ACModel = require('../../../models').AccessControl;

class OfferAC {
  async canEditOfferStatus({
    userId, offerId, newStatus,
    allowFalse
  }) {
    return await ACModel.OfferAC.create().canEditOfferStatus({
      userId, offerId, newStatus, allowFalse
    });
  }
}

module.exports = {
  create: () => new OfferAC
}