const OfferModel = require('../../models').Offer;

class Offer {
  offerModel = OfferModel.create();

  async getAllFullInfo({ limit, skip, filters, sorts }) {
    return await this.offerModel.getAllFullInfo({
      limit, skip, filters, sorts
    });
  }

  async addNew({
    tenderId, priceUSD, bIncludeDelivery, deliveryCost, 
    deliveryAddress, status, acceptedAt, excutedAt
  }) {
    await this.offerModel.addNew({
      tenderId, priceUSD, bIncludeDelivery, deliveryCost, 
      deliveryAddress, status, acceptedAt, excutedAt
    });
  }

  async update({
    idOffer, tenderId, priceUSD, bIncludeDelivery, deliveryCost, 
    deliveryAddress, status, acceptedAt, excutedAt
  }) {
    await this.offerModel.update({
      idOffer, tenderId, priceUSD, bIncludeDelivery, deliveryCost, 
      deliveryAddress, status, acceptedAt, excutedAt
    });
  }

  async delete({ idOffer }) {
    await this.offerModel.delete({ idOffer });
  }

}


module.exports = {
  create: () => new Offer
};