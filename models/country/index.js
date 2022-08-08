
const Model = require('../model');
const StringModel = require('../resource').String;

class Country extends Model {
  static TABLE_NAME = 'countries';
  static PRIMARY_KEY = 'id_country';

  async getAllFullInfo({
    limit, skip, filters, sorts
  }) {

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        countries;`
      

    let dataQuery =
      `SELECT
        id_country	idCountry,
				fun_get_string('${StringModel.LANGS.EN}', name_str_id)	nameEn,
        fun_get_string('${StringModel.LANGS.AR}', name_str_id)	nameAr,
				iso_code	isoCode,
				phone_code	phoneCode,
				img_id	imgId
      FROM
        countries`;

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
    nameEn, nameAr, isoCode, phoneCode, imgUrl
  }) {
    let stringModel = StringModel.create();
    let nameStrId = await stringModel.addNewString({
      enStr: nameEn, arStr: nameAr
    });

    let dbRet = await this.directQuery (
      'CALL prc_add_country(?, @new_record_id);',
      [nameStrId, isoCode, phoneCode, imgUrl]
    );

    return { newId: dbRet[0][0].newRecId };
  }

  async update({
    idCountry, nameEn, nameAr, isoCode, phoneCode,
    imgUrl
  }) {
    let stringModel = StringModel.create();
    await stringModel.updateString({
      tableName: Country.TABLE_NAME,
      idColName: Country.PRIMARY_KEY,
      idColValue: idCountry,
      strColName: 'name_str_id',
      enStr: nameEn, 
      arStr: nameAr
    });

    await this.directQuery (
      'CALL prc_update_country(?);',
      [idCountry, isoCode, phoneCode, imgUrl]
    );
  }

  async delete({ idCountry }) {
    await this.directQuery (
      'CALL prc_delete_country(?);',
      idCountry
    );
  }

}

module.exports = {
  create: () => new Country
};
