
const Model = require('../model');

class Report extends Model {
  async usersUsge () {
    let dbRet = await this.directQuery (
      'CALL prc_report_users_usage();',
    );

    return { data: dbRet[0] }
  }

  async categoriesUsge () {
    let dbRet = await this.directQuery (
      'CALL prc_report_categories_usage();',
    );

    return { data: dbRet[0] }
  }

  async brandsUsge () {
    let dbRet = await this.directQuery (
      'CALL prc_report_brands_usage();',
    );

    return { data: dbRet[0] }
  }

  async companyTypesUsge () {
    let dbRet = await this.directQuery (
      'CALL prc_report_company_types_usage();',
    );

    return { data: dbRet[0] }
  }
  
}

module.exports = {
  create: () => new Report
};
