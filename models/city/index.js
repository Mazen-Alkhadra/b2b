
const Model = require('../model');
const StringModel = require('../resource').String;

class City extends Model {
  static TABLE_NAME = 'cities';
  static PRIMARY_KEY = 'id_city';

  async getAllFullInfo({
    limit, skip, filters, sorts
  }) {

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        cities;`
      

    let dataQuery =
      `SELECT
        id_city	idCity,
				fun_get_string('${StringModel.LANGS.EN}', name_str_id)	nameEn,
        fun_get_string('${StringModel.LANGS.AR}', name_str_id)	nameAr,
				country_id countryId,
				fun_get_img(img_id)	imgUrl
      FROM
        cities`;

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
    nameEn, nameAr, countryId, imgUrl
  }) {
    let stringModel = StringModel.create();
    let nameStrId = await stringModel.addNewString({
      enStr: nameEn, arStr: nameAr
    });

    let dbRet = await this.directQuery (
      'CALL prc_add_city(?, @new_record_id);',
      [nameStrId, countryId, imgUrl]
    );

    return { newId: dbRet[0][0].newRecId };
  }

  async update({
    idCity, nameEn, nameAr, countryId,
    imgUrl
  }) {
    let stringModel = StringModel.create();
    await stringModel.updateString({
      tableName: City.TABLE_NAME,
      idColName: City.PRIMARY_KEY,
      idColValue: idCity,
      strColName: 'name_str_id',
      enStr: nameEn, 
      arStr: nameAr
    });

    await this.directQuery (
      'CALL prc_update_city(?);',
      [idCity, countryId, imgUrl]
    );
  }

  async delete({ idCity }) {
    await this.directQuery (
      'CALL prc_delete_city(?);',
      idCity
    );
  }

}

module.exports = {
  create: () => new City
};
