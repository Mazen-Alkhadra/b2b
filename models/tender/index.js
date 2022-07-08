
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
        name,
				product_id	productId,
				quantity	quantity,
				from	from,
				to	to,
				delivery_address	deliveryAddress,
				closed_at	closedAt
      FROM
        tenders`;

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

  async addNew({
    name, productId, quantity, from, to, 
    deliveryAddress, closedAt
  }) {
    let dbRet = await this.directQuery (
      'CALL prc_add_tender(?, @new_record_id);',
      [name, productId, quantity, from, to, 
        deliveryAddress, closedAt]
    );

    return { newId: dbRet[0][0].newRecordId };
  }

  async update({
    idTender, name, productId, quantity, from, to,
    deliveryAddress, closedAt
  }) {
    await this.directQuery (
      'CALL prc_update_tender(?);',
      [idTender, name, productId, quantity, from, to,
        deliveryAddress, closedAt]
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
