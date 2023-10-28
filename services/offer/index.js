const OfferModel = require('../../models').Offer;
const NotifySvc = require('../notification');

class Offer {
  offerModel = OfferModel.create();
  
  async getAllFullInfo({ limit, skip, filters, sorts, offerId }) {
    return await this.offerModel.getAllFullInfo({
      limit, skip, filters, sorts, offerId
    });
  }

  async get ({ 
    tenderId, creatByUserId, tenderCreatorByUserId,
    statusArr, exceptUserTrash, reqUserId, 
    limit, skip, sorts
  }) {
    return await this.offerModel.get ({
      tenderId, creatByUserId, 
      tenderCreatorByUserId, reqUserId,
      statusArr, exceptUserTrash, 
      limit, skip, sorts
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

    NotifySvc.Event.create().handl({
      event: NotifySvc.Event.EVENTS_TYPES.OFFER_ACCEPTED,
      data: {offerId: idOffer}
    });
  }

  async setOfferExecuted({idOffer}) {
    await this.update({
      idOffer, 
      status: OfferModel.STATUS.EXECUTED,
      excutedAt: new Date()
    });

    NotifySvc.Event.create().handl({
      event: NotifySvc.Event.EVENTS_TYPES.OFFER_EXECUTED,
      data: {offerId: idOffer}
    });
  }

}


module.exports = {
  create: () => new Offer,
  STATUS: OfferModel.STATUS
};