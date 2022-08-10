
const Model = require('../model');
const StringModel = require('../resource').String;

class CompanyType extends Model {
  static TABLE_NAME = 'company_types';
  static PRIMARY_KEY = 'id_company_type';

  async getAllFullInfo({
    limit, skip, filters, sorts
  }) {

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        company_types;`
      

    let dataQuery =
      `SELECT
        id_company_type	idCompanyType,
				fun_get_string(NULL, name_str_id)	nameEn,
				fun_get_string(NULL, description_str_id) descriptionEn
      FROM
        company_types`;

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
    nameEn, descriptionEn
  }) {
    let nameStrId = 
      await StringModel.create().addNewString({enStr: nameEn});
    let descriptionStrId = 
      await StringModel.create().addNewString({enStr: descriptionEn});

    let dbRet = await this.directQuery (
      'CALL prc_add_company_type(?, @new_record_id);',
      [nameStrId, descriptionStrId]
    );

    return { newId: dbRet[0][0].newRecordId };
  }

  async update({
    idCompanyType, nameEn, descriptionEn
  }) {

    await StringModel.create().updateString({
      tableName: CompanyType.TABLE_NAME,
      idColName: CompanyType.PRIMARY_KEY,
      idColValue: idCompanyType,
      strColName: 'name_str_id',
      enStr: nameEn
    });

    await StringModel.create().updateString({
      tableName: CompanyType.TABLE_NAME,
      idColName: CompanyType.PRIMARY_KEY,
      idColValue: idCompanyType,
      strColName: 'description_str_id',
      enStr: descriptionEn
    });
  }

  async delete({ idCompanyType }) {
    await this.directQuery (
      'CALL prc_delete_company_type(?);',
      idCompanyType
    );
  }

}

module.exports = {
  create: () => new CompanyType
};
