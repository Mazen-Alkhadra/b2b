const CompanyModel = require('../../models').Company;

class Company {
  companyModel = CompanyModel.create();

  async getAllFullInfo({ limit, skip, filters, sorts }) {
    return await this.companyModel.getAllFullInfo({
      limit, skip, filters, sorts
    });
  }

  async addNew({
    nameEn, type, address, licenseNumber, establishAt
  }) {
    await this.companyModel.addNew({
      nameEn, type, address, licenseNumber, establishAt
    });
  }

  async update({
    idCompany, nameEn, type, address, licenseNumber, establishAt
  }) {
    await this.companyModel.update({
      idCompany, nameEn, type, address, licenseNumber, establishAt
    });
  }

  async delete({ idCompany }) {
    await this.companyModel.delete({ idCompany });
  }

}


module.exports = {
  create: () => new Company
};