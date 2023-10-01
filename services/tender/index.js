const TenderModel = require('../../models').Tender;
const NotifySvc = require('../notification');

class Tender {
  tenderModel = TenderModel.create();

  async getAllFullInfo({ limit, skip, filters, sorts }) {
    return await this.tenderModel.getAllFullInfo({
      limit, skip, filters, sorts
    });
  }

  async get ({ 
    onlyCreatByUserId, onlyCareByUserId,
    tenderId, onlyUnCompleted, exceptUserTrash,
    reqUserId
  }) {
    return await this.tenderModel.get({ 
      onlyCreatByUserId, onlyCareByUserId,
      tenderId, onlyUnCompleted, exceptUserTrash,
      reqUserId
    });
  }

  async getB2B ({ userId, isPending }) {
    return await this.tenderModel.getB2B({ userId, isPending });    
  }

  async getContactInfo ({ userId, offerId, tenderId }) {   
    return await this.tenderModel.getContactInfo({userId, offerId, tenderId});
  }
  
  async addNew({
    creatByUserId, name, productId, quantity,
    from, to, deliverBefore, cityId, area, 
    street, buildingNumber, addressLongitude, 
    addressLatitude, moreAddressInfo, status, 
    closedAt, supplierLocation, payMethod
  }) {
    let {newId} = await this.tenderModel.addNew({
      creatByUserId, name, productId, quantity,
      from, to, deliverBefore, cityId, area, 
      street, buildingNumber, addressLongitude, 
      addressLatitude, moreAddressInfo, status,
      closedAt, supplierLocation, payMethod
    });

    NotifySvc.Event.create().handl({
      event: NotifySvc.Event.EVENTS_TYPES.NEW_TENDER_CREATED,
      data: {tenderId: newId, tenderName: name}
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