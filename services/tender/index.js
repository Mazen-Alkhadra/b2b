const TenderModel = require('../../models').Tender;

class Tender {
  tenderModel = TenderModel.create();

  async getAllFullInfo({ limit, skip, filters, sorts }) {
    return await this.tenderModel.getAllFullInfo({
      limit, skip, filters, sorts
    });
  }

  async get ({ onlyCreatByUserId, onlyCareByUserId }) {
    return await this.tenderModel.get({ 
      onlyCreatByUserId, onlyCareByUserId 
    });
  }

  async getB2B ({ userId }) {
    return await this.tenderModel.getB2B({ userId });    
  }

  async addNew({
    creatByUserId, name, productId, quantity,
    from, to, deliverBefore, cityId, area, 
    street, buildingNumber, addressLongitude, 
    addressLatitude, moreAddressInfo, status, 
    closedAt, supplierLocation, payMethod
  }) {
    await this.tenderModel.addNew({
      creatByUserId, name, productId, quantity,
      from, to, deliverBefore, cityId, area, 
      street, buildingNumber, addressLongitude, 
      addressLatitude, moreAddressInfo, status,
      closedAt, supplierLocation, payMethod
    });
  }

  async update({
    idTender, creatByUserId, name, productId, quantity,
    from, to, deliverBefore, cityId, area, 
    street, buildingNumber, addressLongitude, 
    addressLatitude, moreAddressInfo, status, 
    closedAt, supplierLocation, payMethod
  }) {
    await this.tenderModel.update({
      idTender, creatByUserId, name, productId, quantity,
      from, to, deliverBefore, cityId, area, 
      street, buildingNumber, addressLongitude, 
      addressLatitude, moreAddressInfo, status, 
      closedAt, supplierLocation, payMethod
    });
  }

  async delete({ idTender }) {
    await this.tenderModel.delete({ idTender });
  }

}


module.exports = {
  create: () => new Tender
};