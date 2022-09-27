
const Model = require('../model');

class Report extends Model {
  async usersUsge () {
    let dbRet = await this.directQuery (
      'CALL prc_report_users_usage();',
    );

    return { data: dbRet[0] }
  }
}

module.exports = {
  create: () => new Report
};
