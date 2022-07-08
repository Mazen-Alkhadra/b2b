
const Model = require('../../model');

class UserCare extends Model {
  static TABLE_NAME = 'users_cares';

  async getAllFullInfo({
    limit, skip, filters, sorts
  }) {

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        users_cares;`
      

    let dataQuery =
      `SELECT
				user_id	userId,
				category_id	categoryId,
				brand_id	brandId,
				product_id	productId
      FROM
        users_cares`;

    let queryStr = countQuery + dataQuery;

    queryStr = this.applyFilters(dataQuery, filters) || queryStr;
    queryStr += this.getOrderClause(sorts);
    queryStr += this.getLimitClause({ limit, skip });


    let dbRet = await this.directQuery(queryStr);

    return {
      allCount: dbRet[0][0].allCount,
      data: dbRet[1]
    };

  }

  async resetUserCares({
    userId, 
    cares //[{categoryId, brandId, productId}]
  }) {
    let queryStr = 'CALL prc_delete_all_user_cares(?);';
    let queryParams = [userId];
    
    cares.forEach(({
      categoryId, brandId, productId
    }) => {
      queryStr += 'CALL prc_add_user_care(?);';
      queryParams.push([userId, categoryId, brandId, productId]);
    });

    await this.directQuery(queryStr, ...queryParams);
  }
}

module.exports = {
  create: () => new UserCare
};
