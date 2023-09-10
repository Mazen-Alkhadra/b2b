const CompanyModel = require('../../models').Company;

class Company {
  companyModel = CompanyModel.create();

  async getAllFullInfo({ limit, skip, filters, sorts }) {
    return await this.companyModel.getAllFullInfo({
      limit, skip, filters, sorts
    });
  }

  async addNew({
    nameEn, companyTypeId, licenseNumber, establishAt,
    licenseImgUrl, cityId, area, street, buildingNumber,
    addressLongitude, addressLatitude, moreAddressInfo, 
    licenseExpirAt, isTrusted
  }) {
    return await this.companyModel.addNew({
      nameEn, companyTypeId, licenseNumber, establishAt,
      licenseImgUrl, cityId, area, street, buildingNumber,
      addressLongitude, addressLatitude, moreAddressInfo, 
      licenseExpirAt, isTrusted
    });
  }

  async update({
    idCompany, nameEn, companyTypeId, licenseNumber, establishAt,
    licenseImgUrl, cityId, area, street, buildingNumber,
    addressLongitude, addressLatitude, moreAddressInfo, 
    licenseExpirAt, isTrusted
  }) {
    await this.companyModel.update({
      idCompany, nameEn, companyTypeId, licenseNumber, establishAt,
      licenseImgUrl, cityId, area, street, buildingNumber,
      addressLongitude, addressLatitude, moreAddressInfo, 
      licenseExpirAt, isTrusted
    });
  }

  async delete({ idCompany }) {
    await this.companyModel.delete({ idCompany });
  }

}


module.exports = {
  create: () => new Company
};