
const Model = require('../model');

class Payment extends Model {
  static TABLE_NAME = 'payments';
  static PRIMARY_KEY = 'id_payment';

  async getAllFullInfo({
    limit, skip, filters, sorts,
    summaries
  }) {

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        payments;`
      

    let dataQuery =
      `SELECT
        id_payment idPayment,
				user_id	userId,
				type,
				amount_usd amountUsd,
				comment,
				status,
        complete_at completeAt,
        CONCAT(first_name, '', last_name) userFullName,
        email,
        mobile
      FROM
        payments
        INNER JOIN users ON user_id = id_user`;

    let queryStr = countQuery + dataQuery;
    let filteredQuery = this.applyFilters(dataQuery, filters);

    queryStr = filteredQuery.finalQuery || queryStr;
    queryStr += this.getOrderClause(sorts);
    queryStr += this.getLimitClause({ limit, skip });
    queryStr += ';\n' + this.getSummarySqlQuery({ 
      dataQuery: filteredQuery.dataQuery || dataQuery, 
      summaries 
    });

    let dbRet = await this.directQuery(queryStr);

    return {
      allCount: dbRet[0][0].allCount,
      data: dbRet[1],
      summary: dbRet[2] && dbRet[2][0] ? Object.values(dbRet[2][0]) : null
    };

  }

  async get ({
    userId 
  }) {      

    let userCond = !userId ? 'TRUE' : 
      `user_id = ${this.escapeSql(userId)}`;

    let queryQuery =
      `SELECT
        id_payment idPayment,
				user_id	userId,
				type,
				amount_usd amountUsd,
				comment,
				status,
        complete_at completeAt
      FROM
        payments
      WHERE 
        ${userCond}`;

    let dbRet = await this.directQuery(queryStr);

    return { data: dbRet[0] };

  }

  async addNew({
    userId, type, amountUsd, comment, status
  }) {
    let dbRet = await this.directQuery (
      'CALL prc_add_payment(?, @new_record_id);',
      [userId, type, amountUsd, comment, status]
    );

    return { newId: dbRet[0][0].newRecordId };
  }

  async update({
    idPayment, userId, type, amountUsd, comment, status
  }) {
    await this.directQuery (
      'CALL prc_update_payment(?);',
      [idPayment, userId, type, amountUsd, comment, status]
    );
  }

  async delete({ idPayment }) {
    await this.directQuery (
      'CALL prc_delete_payment(?);',
      idPayment
    );
  }

}

module.exports = {
  create: () => new Payment
};
