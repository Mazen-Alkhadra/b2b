const AboutModel = require('../../models').Aboutus;

class Aboutus {
  aboutModel = AboutModel.create();

  async getAllFullInfo({ limit, skip, filters, sorts }) {
    return await this.aboutModel.getAllFullInfo({
      limit, skip, filters, sorts
    });
  }

  async addNew({
    companyInfoEn, whoAreWeEn, viewEn,
    targetEn, otherInfoEn, isActive
  }) {
    await this.aboutModel.addNew({
      companyInfoEn, whoAreWeEn, viewEn,
      targetEn, otherInfoEn, isActive
    });
  }

  async update({
    idAboutus, companyInfoEn, whoAreWeEn, viewEn,
    targetEn, otherInfoEn, isActive
  }) {
    await this.aboutModel.update({
      idAboutus, companyInfoEn, whoAreWeEn, viewEn,
      targetEn, otherInfoEn, isActive
    });
  }

  async delete({ idAboutus }) {
    await this.aboutModel.delete({ idAboutus });
  }

}


module.exports = {
  create: () => new Aboutus
};