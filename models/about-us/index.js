
const Model = require('../model');
const StringModel = require('../resource').String;

class Aboutus extends Model {
  static TABLE_NAME = 'about_us';
  static PRIMARY_KEY = 'id_about_us';

  async getAllFullInfo({
    limit, skip, filters, sorts
  }) {

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        about_us;`
      

    let dataQuery =
      `SELECT
        id_about_us	idAboutus,
				fun_get_string(NULL, company_info_str_id)	companyInfoEn,
				fun_get_string(NULL, who_are_we_str_id)	whoAreWeEn,
				fun_get_string(NULL, view_str_id)	viewEn,
				fun_get_string(NULL, target_str_id)	targetEn,
				fun_get_string(NULL, other_info_str_id)	otherInfoEn,
				is_active	isActive
      FROM
        about_us`;

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
    companyInfoEn, whoAreWeEn, viewEn, 
    targetEn, otherInfoEn, isActive
  }) {

    let strModel = StringModel.create();
    let companyInfoStrId = await strModel.addNewString({enStr: companyInfoEn});
    let whoAreWeStrId = await strModel.addNewString({enStr: whoAreWeEn});
    let viewStrId = await strModel.addNewString({enStr: viewEn});
    let targetStrId = await strModel.addNewString({enStr: targetEn});
    let otherInfoStrId = await strModel.addNewString({enStr: otherInfoEn});

    let dbRet = await this.directQuery (
      'CALL prc_add_about_us(?, @new_record_id);',
      [companyInfoStrId, whoAreWeStrId, viewStrId, 
        targetStrId, otherInfoStrId, isActive]
    );

    return { newId: dbRet[0][0].newRecordId };
  }

  async update({
    idAboutus, companyInfoEn, whoAreWeEn, viewEn, 
    targetEn, otherInfoEn, isActive
  }) {
    let strModel = StringModel.create();
    await strModel.updateString({
      tableName: Aboutus.TABLE_NAME,
      idColName: Aboutus.PRIMARY_KEY,
      idColValue: idAboutus,
      strColName: 'company_info_str_id',
      enStr: companyInfoEn
    });

    await strModel.updateString({
      tableName: Aboutus.TABLE_NAME,
      idColName: Aboutus.PRIMARY_KEY,
      idColValue: idAboutus,
      strColName: 'who_are_we_str_id',
      enStr: whoAreWeEn
    });

    await strModel.updateString({
      tableName: Aboutus.TABLE_NAME,
      idColName: Aboutus.PRIMARY_KEY,
      idColValue: idAboutus,
      strColName: 'view_str_id',
      enStr: viewEn
    });

    await strModel.updateString({
      tableName: Aboutus.TABLE_NAME,
      idColName: Aboutus.PRIMARY_KEY,
      idColValue: idAboutus,
      strColName: 'target_str_id',
      enStr: targetEn
    });

    await strModel.updateString({
      tableName: Aboutus.TABLE_NAME,
      idColName: Aboutus.PRIMARY_KEY,
      idColValue: idAboutus,
      strColName: 'other_info_str_id',
      enStr: otherInfoEn
    });

    await this.directQuery (
      'CALL prc_update_about_us(?);',
      [idAboutus, isActive]
    );
  }

  async delete({ idAboutus }) {
    await this.directQuery (
      'CALL prc_delete_about_us(?);',
      idAboutus
    );
  }

}

module.exports = {
  create: () => new Aboutus
};
