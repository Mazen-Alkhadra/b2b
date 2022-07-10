const PrivacyPolicyModel = require('../../models').PrivacyPolicy;

class PrivacyPolicy {
  privacyPolicyModel = PrivacyPolicyModel.create();

  async getAllFullInfo({ limit, skip, filters, sorts }) {
    return await this.privacyPolicyModel.getAllFullInfo({
      limit, skip, filters, sorts
    });
  }

  async addNew({
    contentEn, isActive
  }) {
    await this.privacyPolicyModel.addNew({
      contentEn, isActive
    });
  }

  async update({
    idPrivacyPolicy, contentEn, isActive
  }) {
    await this.privacyPolicyModel.update({
      idPrivacyPolicy, contentEn, isActive
    });
  }

  async delete({ idPrivacyPolicy }) {
    await this.privacyPolicyModel.delete({ idPrivacyPolicy });
  }

}


module.exports = {
  create: () => new PrivacyPolicy
};