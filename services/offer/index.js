const OfferModel = require('../../models').Offer;

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

}


module.exports = {
  create: () => new Offer
};