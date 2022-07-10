
const Model = require('../model');
const StringModel = require('../resource').String;

class Brand extends Model {
  static TABLE_NAME = 'brands';
  static PRIMARY_KEY = 'id_brand';

  async getAllFullInfo({
    limit, skip, filters, sorts
  }) {

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        brands;`
      

    let dataQuery =
      `SELECT
        id_brand	idBrand,
				fun_get_string(NULL, b.name_str_id)	nameEn,
				fun_get_string(NULL, b.description_str_id) descriptionEn,
				category_id	categoryId,
				fun_get_string(NULL, c.name_str_id)	categoryNameEn,
				b.added_by_user_id	addedByUserId
      FROM
        brands b
        LEFT JOIN categories c ON ctegory_id = id_category`;

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
    nameEn, descriptionEn, categoryId, addedByUserId
  }) {

    let strModel = StringModel.create();
    let nameStrId = await strModel.addNewString({enStr: nameEn});
    let descStrId = await strModel.addNewString({enStr: descriptionEn});

    let dbRet = await this.directQuery (
      'CALL prc_add_brand(?, @new_record_id);',
      [nameStrId, descStrId, categoryId, addedByUserId]
    );

    return { newId: dbRet[0][0].newRecordId };
  }

  async update({
    idBrand, nameEn, descriptionEn, categoryId, addedByUserId
  }) {
    let strModel = StringModel.create();
    await strModel.updateString({
      tableName: Brand.TABLE_NAME,
      idColName: Brand.PRIMARY_KEY,
      idColValue: idBrand,
      strColName: 'name_str_id',
      enStr: nameEn
    });

    await strModel.updateString({
      tableName: Brand.TABLE_NAME,
      idColName: Brand.PRIMARY_KEY,
      idColValue: idBrand,
      strColName: 'description_str_id',
      enStr: descriptionEn
    });

    await this.directQuery (
      'CALL prc_update_brand(?);',
      [idBrand, categoryId, addedByUserId]
    );
  }

  async delete({ idBrand }) {
    await this.directQuery (
      'CALL prc_delete_brand(?);',
      idBrand
    );
  }

}

module.exports = {
  create: () => new Brand
};
