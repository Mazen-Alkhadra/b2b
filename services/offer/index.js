const OfferModel = require('../../models').Offer;
const NotifySvc = require('../notification');

class Offer {
  offerModel = OfferModel.create();
  
  async getAllFullInfo({ limit, skip, filters, sorts }) {
    return await this.offerModel.getAllFullInfo({
      limit, skip, filters, sorts
    });
  }

  async get ({ 
    tenderId, creatByUserId, tenderCreatorByUserId 
  }) {
    return await this.offerModel.get ({
      tenderId, creatByUserId,
      tenderCreatorByUserId
    });
  }

  async addNew({
    tenderId, creatByUserId, quantity, priceUSD, 
    bIncludeDelivery, deliveryCost, deliveryAddress,
    status, tax, cityId, acceptedAt, excutedAt
  }) {
    await this.offerModel.addNew({
      tenderId, creatByUserId, quantity, priceUSD, 
      bIncludeDelivery, deliveryCost, deliveryAddress,
      status, tax, cityId, acceptedAt, excutedAt
    });

    NotifySvc.Event.create().handl({
      event: NotifySvc.Event.EVENTS_TYPES.NEW_OFFER_CREATED,
      data: {tenderId}
    });
  }

  async update({
    idOffer, tenderId, creatByUserId, quantity, priceUSD, 
    bIncludeDelivery, deliveryCost, deliveryAddress, 
    status, tax, cityId, acceptedAt, excutedAt
  }) {
    await this.offerModel.update({
      idOffer, tenderId, creatByUserId, quantity, priceUSD, 
      bIncludeDelivery, deliveryCost, deliveryAddress, 
      status, tax, cityId, acceptedAt, excutedAt
    });
  }

  async delete({ idOffer }) {
    await this.offerModel.delete({ idOffer });
  }

  async acceptOffer({idOffer}) {
    await this.update({
      idOffer, 
      status: OfferModel.STATUS.ACCEPTED,
      acceptedAt: new Date()
    });
  }

  async setOfferExecuted({idOffer}) {
    await this.update({
      idOffer, 
      status: OfferModel.STATUS.EXECUTED,
      excutedAt: new Date()
    });
  }

}


module.exports = {
  create: () => new Offer,
  STATUS: OfferModel.STATUS
};