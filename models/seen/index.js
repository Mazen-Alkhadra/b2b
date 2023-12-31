
const Model = require('../model');

class Seen extends Model {
  static TABLE_NAME = 'seen';
    
  async get({ 
    userId, type, limit, skip, filters, sorts
  }) {

    let userCond = !userId ? 'TRUE' : `user_id = ${this.escapeSql(userId)}`;
    let typeCond = !type ? 'TRUE' : `type = ${this.escapeSql(type)}`;

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        seen
      WHERE 
        ${userCond} AND 
        ${typeCond};`
      

    let dataQuery =
      `SELECT
        id,
        record_id recordId,
				user_id userId,
				type,
        seen.creat_at seenAt,
        id_tender tenderId,
        t.name tenderName,
        t.serial_num tenderSerialNum,
        t.quantity tenderQuantity,
        o.quantity offerQuantity,
        id_product	productId,
        fun_get_string(NULL, p.name_str_id) productName,
        fun_get_img(p.img_id) productImgUrl
      FROM
        seen  
        LEFT JOIN offers o ON type = 'OFFER' AND id_offer = record_id
        LEFT JOIN tenders t ON 
          (type = 'TENDER' AND id_tender = record_id) OR
          id_tender = o.tender_id 
        LEFT JOIN products p ON p.id_product = product_id 
      WHERE 
        ${userCond} AND 
        ${typeCond}`;

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
    recordId, userId, type
  }) {
    await this.directQuery (
      'CALL prc_add_to_seen(?);',
      [recordId, userId, type]
    );
  }
}

module.exports = {
  create: () => new Seen
};
