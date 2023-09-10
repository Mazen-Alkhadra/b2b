const IssueReportModel = require('../../models').IssueReport;

class IssueReport {
  issueReportModel = IssueReportModel.create();

  async getAllFullInfo({ limit, skip, filters, sorts }) {
    return await this.issueReportModel.getAllFullInfo({
      limit, skip, filters, sorts
    });
  }

  async addNew({
    reporterUserId, publicEmail, content, status
  }) {
    await this.issueReportModel.addNew({
      reporterUserId, publicEmail, content, status
    });
  }

  async update({
    idIssueReport, reporterUserId, publicEmail, 
    content, status
  }) {
    await this.issueReportModel.update({
      idIssueReport, reporterUserId, publicEmail, 
      content, status
    });
  }

  async delete({ idIssueReport }) {
    await this.issueReportModel.delete({ idIssueReport });
  }

}


module.exports = {
  create: () => new IssueReport
};