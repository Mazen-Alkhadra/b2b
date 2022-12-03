
const Model = require('../../model');

const CODES_TYPE = {
  ACTIVATE: 'ACTIVATE',
  RESET_PASS: 'RESET_PASS'
}

class User_code extends Model {
  static TABLE_NAME = 'users_codes';
  static PRIMARY_KEY = 'id_code';

  async getAllFullInfo({
    limit, skip, filters, sorts
  }) {

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        users_codes;`
      

    let dataQuery =
      `SELECT
        id_code	idCode,
				user_id	userId,
        login_name loginName,
				code,
				type,
				is_active	isActive,
				expiry_date_time expiryDateTime
      FROM
        users_codes`;

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
    userId, loginName, code, type, isActive, 
    expiryDateTime
  }) {
    let dbRet = await this.directQuery (
      'CALL prc_add_user_code(?, @new_record_id);',
      [userId, loginName, code, type, isActive, 
        expiryDateTime]
    );

    return { newId: dbRet[0][0].newRecId };
  }

  async update({
    idCode, userId, loginName, code, type,
    isActive, expiryDateTime
  }) {
    await this.directQuery (
      'CALL prc_update_user_code(?);',
      [idCode, userId, loginName, code, type,
        isActive, expiryDateTime]
    );
  }

  async consume ({ loginName, code }) {
    let dbRet = await this.directQuery (
      'CALL prc_consume_user_code(?);',
      [code, loginName]
    );

    return {idUser: dbRet[0].idUser};
  }

  async delete({ idCode }) {
    await this.directQuery (
      'CALL prc_delete_user_code(?);',
      idCode
    );
  }
}

module.exports = {
  create: () => new User_code,
  CODES_TYPE
};
