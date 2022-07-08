const IssueReportModel = require('../../models').IssueReport;

class IssueReport {
  issueReportModel = IssueReportModel.create();

  async getAllFullInfo({ limit, skip, filters, sorts }) {
    return await this.issueReportModel.getAllFullInfo({
      limit, skip, filters, sorts
    });
  }

  async addNew({
    reporterUserId, content, status
  }) {
    await this.issueReportModel.addNew({
      reporterUserId, content, status
    });
  }

  async update({
    idIssueReport, reporterUserId, content, status
  }) {
    await this.issueReportModel.update({
      idIssueReport, reporterUserId, content, status
    });
  }

  async delete({ idIssueReport }) {
    await this.issueReportModel.delete({ idIssueReport });
  }

}


module.exports = {
  create: () => new IssueReport
};