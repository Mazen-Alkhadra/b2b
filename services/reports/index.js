
const ReportModel = require('../../models').Reports;

class Report {

  reportModel = ReportModel.create();

  async usersUsge () {
    return await this.reportModel.usersUsge();
  }

  async categoriesUsge () {
    return await this.reportModel.categoriesUsge();
  }

  async brandsUsge () {
    return await this.reportModel.brandsUsge();
  }

  async companyTypesUsge () {
    return await this.reportModel.companyTypesUsge();
  }
}

module.exports = {
  create: () => new Report
};
