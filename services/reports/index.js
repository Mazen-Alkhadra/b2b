
const ReportModel = require('../../models').Reports;

class Report {

  reportModel = ReportModel.create();

  async usersUsge () {
    return await this.reportModel.usersUsge();
  }

}

module.exports = {
  create: () => new Report
};
