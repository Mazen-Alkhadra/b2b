
const Model = require('../model');
const StringModel = require('../resource').String;

class Category extends Model {
  static TABLE_NAME = 'categories';
  static PRIMARY_KEY = 'id_category';

  async getAllFullInfo({
    limit, skip, filters, sorts, 
    onlyApproved
  }) {

    let approvedCond = !onlyApproved ? 'TRUE' : 'is_approved = TRUE';
    
    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        categories
      WHERE 
        ${approvedCond};`
      

    let dataQuery =
      `SELECT
        id_category	idCategory,
				fun_get_string(NULL, name_str_id)	nameEn,
				fun_get_string(NULL, description_str_id)	descriptionEn,
				type type,
				added_by_user_id	addedByUserId,
        is_approved isApproved
      FROM
        categories
      WHERE 
        ${approvedCond}`;

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
    nameEn, descriptionEn, type, addedByUserId, isApproved
  }) {
    let strModel = StringModel.create();
    let nameStrId = await strModel.addNewString({enStr: nameEn});
    let descStrId = await strModel.addNewString({enStr: descriptionEn});

    let dbRet = await this.directQuery (
      'CALL prc_add_category(?, @new_record_id);',
      [nameStrId, descStrId, type, addedByUserId, isApproved]
    );

    return { newId: dbRet[0][0].newRecId };
  }

  async update({
    idCategory, nameEn, descriptionEn, type, addedByUserId,
    isApproved
  }) {
    let strModel = StringModel.create();
    await strModel.updateString({
      tableName: Category.TABLE_NAME,
      idColName: Category.PRIMARY_KEY,
      idColValue: idCategory,
      strColName: 'name_str_id',
      enStr: nameEn
    });

    await strModel.updateString({
      tableName: Category.TABLE_NAME,
      idColName: Category.PRIMARY_KEY,
      idColValue: idCategory,
      strColName: 'description_str_id',
      enStr: descriptionEn
    });

    await this.directQuery (
      'CALL prc_update_category(?);',
      [idCategory, type, addedByUserId, isApproved]
    );
  }

  async delete({ idCategory }) {
    await this.directQuery (
      'CALL prc_delete_category(?);',
      idCategory
    );
  }

}

module.exports = {
  create: () => new Category
};
