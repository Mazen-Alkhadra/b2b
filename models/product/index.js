
const Model = require('../model');
const StringModel = require('../resource').String;

class Product extends Model {
  static TABLE_NAME = 'products';
  static PRIMARY_KEY = 'id_product';

  async getAllFullInfo({
    limit, skip, filters, sorts
  }) {

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        products;`
      

    let dataQuery =
      `SELECT
        id_product	idProduct,
				fun_get_string(NULL, p.name_str_id)	nameEn,
				fun_get_string(NULL, p.description_str_id)	descriptionEn,
				brand_id	brandId,
        b.category_id categoryId,
        fun_get_string(NULL, b.name_str_id)	brandNameEn,
        fun_get_string(NULL, c.name_str_id)	categoryNameEn,
				p.added_by_user_id	addedByUserId,
        fun_get_img(p.img_id) imgUrl,
        p.creat_at creatAt
      FROM
        products p
        LEFT JOIN brands b ON brand_id = id_brand
        LEFT JOIN categories c ON category_id = id_category`;

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
    nameEn, descriptionEn, brandId, addedByUserId, imgUrl
  }) {

    let strModel = StringModel.create();
    let nameStrId = await strModel.addNewString({enStr: nameEn});
    let descStrId = await strModel.addNewString({enStr: descriptionEn});

    let dbRet = await this.directQuery (
      'CALL prc_add_product(?, @new_record_id);',
      [nameStrId, descStrId, brandId, addedByUserId, imgUrl]
    );

    return { newId: dbRet[0][0].newRecordId };
  }

  async update({
    idProduct, nameEn, descriptionEn, brandId, addedByUserId, 
    imgUrl
  }) {

    let strModel = StringModel.create();
    await strModel.updateString({
      tableName: Product.TABLE_NAME,
      idColName: Product.PRIMARY_KEY,
      idColValue: idProduct,
      strColName: 'name_str_id',
      enStr: nameEn
    });

    await strModel.updateString({
      tableName: Product.TABLE_NAME,
      idColName: Product.PRIMARY_KEY,
      idColValue: idProduct,
      strColName: 'description_str_id',
      enStr: descriptionEn
    });

    await this.directQuery (
      'CALL prc_update_product(?);',
      [idProduct, brandId, addedByUserId, imgUrl]
    );
  }

  async delete({ idProduct }) {
    await this.directQuery (
      'CALL prc_delete_product(?);',
      idProduct
    );
  }

}

module.exports = {
  create: () => new Product
};
