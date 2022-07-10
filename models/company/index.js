
const Model = require('../model');
const StringModel = require('../resource').String;

class Company extends Model {
  static TABLE_NAME = 'companies';
  static PRIMARY_KEY = 'id_company';

  async getAllFullInfo({
    limit, skip, filters, sorts
  }) {

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        companies;`
      

    let dataQuery =
      `SELECT
        id_company	idCompany,
				fun_get_string(NULL, name_str_id)	nameEn,
				type,
				address,
        license_number licenseNumber,
        DATE(establish_at) establishAt
      FROM
        companies`;

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
    nameEn, type, address, licenseNumber, establishAt
  }) {
    let nameStrId = await StringModel.create().addNewString({enStr: nameEn});

    let dbRet = await this.directQuery (
      'CALL prc_add_company(?, @new_record_id);',
      [nameStrId, type, address, licenseNumber, establishAt]
    );

    return { newId: dbRet[0][0].newRecordId };
  }

  async update({
    idCompany, nameEn, type, address, licenseNumber, establishAt
  }) {

    await StringModel.create().updateString({
      tableName: Company.TABLE_NAME,
      idColName: Company.PRIMARY_KEY,
      idColValue: idCompany,
      strColName: 'name_str_id',
      enStr: nameEn
    });

    await this.directQuery (
      'CALL prc_update_company(?);',
      [idCompany, type, address, licenseNumber, establishAt]
    );
  }

  async delete({ idCompany }) {
    await this.directQuery (
      'CALL prc_delete_company(?);',
      idCompany
    );
  }

}

module.exports = {
  create: () => new Company
};
