const TenderModel = require('../../models').Tender;

class Tender {
  tenderModel = TenderModel.create();

  async getAllFullInfo({ limit, skip, filters, sorts }) {
    return await this.tenderModel.getAllFullInfo({
      limit, skip, filters, sorts
    });
  }

  async addNew({
    name, productId, quantity, from, to, 
    deliveryAddress, closedAt
  }) {
    await this.tenderModel.addNew({
      name, productId, quantity, from, to, 
      deliveryAddress, closedAt
    });
  }

  async update({
    idTender, name, productId, quantity, from, to,
    deliveryAddress, closedAt
  }) {
    await this.tenderModel.update({
      idTender, name, productId, quantity, from, to,
      deliveryAddress, closedAt
    });
  }

  async delete({ idTender }) {
    await this.tenderModel.delete({ idTender });
  }

}


module.exports = {
  create: () => new Tender
};