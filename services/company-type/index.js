const CompanyTypeModel = require('../../models').CompanyType;

class CompanyType {
  companyTypeModel = CompanyTypeModel.create();

  async getAllFullInfo({ limit, skip, filters, sorts }) {
    return await this.companyTypeModel.getAllFullInfo({
      limit, skip, filters, sorts
    });
  }

  async addNew({
    nameEn, descriptionEn
  }) {
    await this.companyTypeModel.addNew({
      nameEn, descriptionEn
    });
  }

  async update({
    idCompanyType, nameEn, descriptionEn
  }) {
    await this.companyTypeModel.update({
      idCompanyType, nameEn, descriptionEn
    });
  }

  async delete({ idCompanyType }) {
    await this.companyTypeModel.delete({ idCompanyType });
  }

}


module.exports = {
  create: () => new CompanyType
};