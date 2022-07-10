const CompanyModel = require('../../models').Company;

class Company {
  companyModel = CompanyModel.create();

  async getAllFullInfo({ limit, skip, filters, sorts }) {
    return await this.companyModel.getAllFullInfo({
      limit, skip, filters, sorts
    });
  }

  async addNew({
    nameEn, type, address, licenseNumber, establishAt,
    licenseImgUrl
  }) {
    await this.companyModel.addNew({
      nameEn, type, address, licenseNumber, establishAt,
      licenseImgUrl
    });
  }

  async update({
    idCompany, nameEn, type, address, licenseNumber, establishAt,
    licenseImgUrl
  }) {
    await this.companyModel.update({
      idCompany, nameEn, type, address, licenseNumber, establishAt,
      licenseImgUrl
    });
  }

  async delete({ idCompany }) {
    await this.companyModel.delete({ idCompany });
  }

}


module.exports = {
  create: () => new Company
};