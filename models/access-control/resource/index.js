
const Model = require('../../model');

class Resource extends Model {
  static TABLE_NAME = 'access_resources';
  static PRIMARY_KEY = 'id_resource';

  async getAllFullInfo({
    limit, skip, filters, sorts
  }) {

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        access_resources;`


    let dataQuery =
      `SELECT
        id_resource	idResource,
				name
      FROM
        access_resources`;

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
  create: () => new Resource
};
