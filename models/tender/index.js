
const Model = require('../model');

class Tender extends Model {
  static TABLE_NAME = 'tenders';
  static PRIMARY_KEY = 'id_tender';

  async getAllFullInfo({
    limit, skip, filters, sorts
  }) {

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        tenders;`
      

    let dataQuery =
      `SELECT
        id_tender	idTender,
        creat_by_user_id  creatByUserId, 
        name,
				product_id	productId,
				quantity	quantity,
				\`from\`,
				\`to\`,
				delivery_address	deliveryAddress,
        status,
				closed_at	closedAt
      FROM
        tenders`;

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
    creatByUserId, name, productId, quantity,
    from, to, deliveryAddress, status, closedAt
  }) {
    let dbRet = await this.directQuery (
      'CALL prc_add_tender(?, @new_record_id);',
      [creatByUserId, name, productId, quantity,
        from, to, deliveryAddress, status, closedAt]
    );

    return { newId: dbRet[0][0].newRecordId };
  }

  async update({
    idTender, creatByUserId, name, productId, quantity,
    from, to, deliveryAddress, status, closedAt
  }) {
    await this.directQuery (
      'CALL prc_update_tender(?);',
      [idTender, creatByUserId, name, productId, quantity,
        from, to, deliveryAddress, status, closedAt]
    );
  }

  async delete({ idTender }) {
    await this.directQuery (
      'CALL prc_delete_tender(?);',
      idTender
    );
  }

}

module.exports = {
  create: () => new Tender
};
