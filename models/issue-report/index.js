
const Model = require('../model');

class IssueReport extends Model {
  static TABLE_NAME = 'issues_reports';
  static PRIMARY_KEY = 'id_issue_report';

  async getAllFullInfo({
    limit, skip, filters, sorts
  }) {

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        issues_reports;`
      

    let dataQuery =
      `SELECT
        id_issue_report	idIssueReport,
				reporter_user_id	reporterUserId,
				content	content,
				status	status
      FROM
        issues_reports`;

    let queryStr = countQuery + dataQuery;

    let filteredQuery = this.applyFilters(dataQuery, filters);
    queryStr = filteredQuery.finalQuery || queryStr;
    queryStr += this.getOrderClause(sorts);
    queryStr += this.getLimitClause({ limit, skip });


    let dbRet = await this.directQuery(queryStr);

    return {
      allCount: dbRet[0][0].allCount,
      data: dbRet[1]
    };

  }

  async addNew({
    reporterUserId, content, status
  }) {
    let dbRet = await this.directQuery (
      'CALL prc_add_issue_report(?, @new_record_id);',
      [reporterUserId, content, status]
    );

    return { newId: dbRet[0][0].newRecordId };
  }

  async update({
    idIssueReport, reporterUserId, content, status
  }) {
    await this.directQuery (
      'CALL prc_update_issue_report(?);',
      [idIssueReport, reporterUserId, content, status]
    );
  }

  async delete({ idIssueReport }) {
    await this.directQuery (
      'CALL prc_delete_issue_report(?);',
      idIssueReport
    );
  }

}

module.exports = {
  create: () => new IssueReport
};
