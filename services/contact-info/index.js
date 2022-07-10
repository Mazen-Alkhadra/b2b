const ContactInfoModel = require('../../models').ContactInfo;

class ContactInfo {
  contactInfoModel = ContactInfoModel.create();

  async getAllFullInfo({ limit, skip, filters, sorts }) {
    return await this.contactInfoModel.getAllFullInfo({
      limit, skip, filters, sorts
    });
  }

  async addNew({
    address, mobile, phone, email, moreInfo, isActive
  }) {
    await this.contactInfoModel.addNew({
      address, mobile, phone, email, moreInfo, isActive
    });
  }

  async update({
    idContactInfo, address, mobile, phone, email, moreInfo, isActive
  }) {
    await this.contactInfoModel.update({
      idContactInfo, address, mobile, phone, email, moreInfo, isActive
    });
  }

  async delete({ idContactInfo }) {
    await this.contactInfoModel.delete({ idContactInfo });
  }

}


module.exports = {
  create: () => new ContactInfo
};