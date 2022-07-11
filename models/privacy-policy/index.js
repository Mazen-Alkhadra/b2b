
const Model = require('../model');
const StringModel = require('../resource').String;

class PrivacyPolicy extends Model {
  static TABLE_NAME = 'privacy_policy';
  static PRIMARY_KEY = 'id_privacy_policy';

  async getAllFullInfo({
    limit, skip, filters, sorts
  }) {

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        privacy_policy;`
      

    let dataQuery =
      `SELECT
        id_privacy_policy	idPrivacyPolicy,
				fun_get_string(NULL, content_str_id)	contentEn,
				is_active	isActive
      FROM
        privacy_policy`;

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
      'CALL prc_add_privacy_policy(?, @new_record_id);',
      [contentStrId, isActive]
    );

    return { newId: dbRet[0][0].newRecordId };
  }

  async update({
    idPrivacyPolicy, contentEn, isActive
  }) {
    let strModel = StringModel.create();
    await strModel.updateString({
      tableName: PrivacyPolicy.TABLE_NAME,
      idColName: PrivacyPolicy.PRIMARY_KEY,
      idColValue: idPrivacyPolicy,
      strColName: 'content_str_id',
      enStr: contentEn
    });

    await this.directQuery (
      'CALL prc_update_privacy_policy(?);',
      [idPrivacyPolicy, isActive]
    );
  }

  async delete({ idPrivacyPolicy }) {
    await this.directQuery (
      'CALL prc_delete_privacy_policy(?);',
      idPrivacyPolicy
    );
  }

}

module.exports = {
  create: () => new PrivacyPolicy
};
