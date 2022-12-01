
const Model = require('../../model');

class UserCare extends Model {
  static TABLE_NAME = 'users_cares';

  async getAllFullInfo({
    limit, skip, filters, sorts,
    idUser
  }) {

    let userCond = !idUser ? 'TRUE' : `user_id = ${this.escapeSql(idUser)}`;

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        users_cares
      WHERE 
        ${userCond};`
      

    let dataQuery =
      `SELECT
        id_user_care idUserCare,
        user_id	userId,
				category_id	categoryId,
				brand_id	brandId,
				product_id	productId
      FROM
        users_cares
      WHERE 
        ${userCond}`;

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

  async get ({ userId }) {

    let userCond = !userId ? 'TRUE' : `user_id = ${this.escapeSql(userId)}`;

    let queryStr =
      `SELECT
        id_user_care idUserCare,
				user_id	userId,
				uc.category_id	categoryId,
        fun_get_string(NULL, c.name_str_id) categoryName,
				uc.brand_id	brandId,
        fun_get_string(NULL, b.name_str_id) brandName,
				uc.product_id	productId,
        fun_get_string(NULL, p.name_str_id) productName
      FROM
        users_cares uc
        LEFT JOIN categories c ON category_id = id_category
        LEFT JOIN brands b ON brand_id = id_brand
        LEFT JOIN products p ON product_id = id_product
      WHERE 
        ${userCond}`;

    let dbRet = await this.directQuery(queryStr);

    return { data: dbRet };

  }

  async resetUserCares({
    userId, 
    cares //[{categoryId, brandId, productId}]
  }) {
    let queryStr = 'CALL prc_delete_all_user_cares(?, NULL);';
    let queryParams = [userId];
    
    cares.forEach(({
      categoryId, brandId, productId
    }) => {
      queryStr += 'CALL prc_add_user_care(?);';
      queryParams.push([userId, categoryId, brandId, productId]);
    });

    await this.directQuery(queryStr, ...queryParams);
  }

  async add ({ userId, categoryId, brandId, productId }) {
    let queryStr = 'CALL prc_add_user_care(?);';
    await this.directQuery(
      queryStr,
      [userId, categoryId, brandId, productId]
    );
  }

  async delete ({ idUserCare }) {
    let queryStr = 'CALL prc_delete_all_user_cares(NULL, ?);';
    await this.directQuery(queryStr, idUserCare);
  }
  
}

module.exports = {
  create: () => new UserCare
};
