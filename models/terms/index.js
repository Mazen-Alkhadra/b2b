
const Model = require('../model');
const StringModel = require('../resource').String;

class Term extends Model {
  static TABLE_NAME = 'terms';
  static PRIMARY_KEY = 'id_term';

  async getAllFullInfo({
    limit, skip, filters, sorts
  }) {

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        terms;`
      

    let dataQuery =
      `SELECT
        id_term	idTerm,
				fun_get_string(NULL, content_str_id) contentEn,
				is_active	isActive
      FROM
        terms`;

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
    contentEn, isActive
  }) {
    let strModel = StringModel.create();
    let contentStrId = await strModel.addNewString({enStr: contentEn});

    let dbRet = await this.directQuery (
      'CALL prc_add_term(?, @new_record_id);',
      [contentStrId, isActive]
    );

    return { newId: dbRet[0][0].newRecordId };
  }

  async update({
    idTerm, contentEn, isActive
  }) {
    let strModel = StringModel.create();
    await strModel.updateString({
      tableName: Term.TABLE_NAME,
      idColName: Term.PRIMARY_KEY,
      idColValue: idTerm,
      strColName: 'content_str_id',
      enStr: contentEn
    });

    await this.directQuery (
      'CALL prc_update_term(?);',
      [idTerm, isActive]
    );
  }

  async delete({ idTerm }) {
    await this.directQuery (
      'CALL prc_delete_term(?);',
      idTerm
    );
  }

}

module.exports = {
  create: () => new Term
};
