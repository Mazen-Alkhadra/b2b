
const Model = require('../model');
const StringModel = require('../resource').String;

class Setting extends Model {

  TABLE_NAME = 'settings';
  PRIMARY_KEY = 'id_setting';

  async getAll({ limit, skip, filters, sorts }) {
    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        settings;`


    let dataQuery =
      `SELECT
        id_setting	idSetting,
				fun_get_string(NULL, name_str_id)	nameEn,
        value
      FROM
        settings`;

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

  async add({ idSetting, nameEn, value }) {
    let nameStrId = await StringModel.create().addNewString({ enStr: nameEn });

    await this.directQuery(
      'CALL prc_add_setting(?);',
      [idSetting, nameStrId, value]
    );
  }

  async update({ idSetting, nameEn, value }) {
    await StringModel.create().updateString({
      tableName: Setting.TABLE_NAME,
      idColName: Setting.PRIMARY_KEY,
      idColValue: idSetting,
      strColName: 'name_str_id',
      enStr: nameEn
    });

    await this.directQuery(
      'CALL prc_update_setting(?);',
      [idSetting, value]
    );
  }

  async delete({ idSetting }) {
    await this.directQuery(
      'CALL prc_delete_setting(?);',
      idSetting
    );
  }

}

module.exports = {
  create: () => new Setting
};
