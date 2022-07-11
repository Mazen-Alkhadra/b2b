
const Model = require('../../model');

class Permission extends Model {
  static TABLE_NAME = 'permissions';
  static PRIMARY_KEY = 'id_permission';

  async getAllFullInfo({
    limit, skip, filters, sorts
  }) {

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        permissions;`


    let dataQuery =
      `SELECT
        id_permission	idResource,
				name
      FROM
        permissions`;

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
}

module.exports = {
  create: () => new Permission
};
