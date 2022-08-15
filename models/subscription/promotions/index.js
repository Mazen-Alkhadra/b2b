
const Model = require('../../model');
const StringModel = require('../../resource').String;

class Promotion extends Model {
  static TABLE_NAME = 'promotions';
  static PRIMARY_KEY = 'id_promotion';

  async getAllFullInfo({
    limit, skip, filters, sorts
  }) {

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        promotions;`
      

    let dataQuery =
      `SELECT
        id_promotion idPromotion,
				code,
				fun_get_string(NULL, description_str_id)	descriptionEn,
				start_at	startAt,
				end_at	endAt,
        use_count_limit useCountLimit,
				discount_usd	discountUsd,
        discount_ratio discountRatio,
				is_active	isActive,
        creat_at creatAt
      FROM
        promotions`;

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
    code, descriptionEn, startAt, endAt, useCountLimit,
    discountUsd, discountRatio, isActive
  }) {

    let descStrId = 
      await StringModel.create().addNewString({enStr: descriptionEn});

    let dbRet = await this.directQuery (
      'CALL prc_add_promotion(?, @new_record_id);',
      [code, descStrId, startAt, endAt, useCountLimit, 
        discountUsd, discountRatio, isActive]
    );

    return { newId: dbRet[0][0].newRecordId };
  }

  async update({
    idPromotion, code, descriptionEn, startAt,
    endAt, useCountLimit, discountUsd, discountRatio,
    isActive
  }) {
    await StringModel.create().updateString({
      tableName: Promotion.TABLE_NAME,
      idColName: Promotion.PRIMARY_KEY,
      idColValue: idPromotion,
      strColName: 'description_str_id',
      enStr: descriptionEn
    });

    await this.directQuery (
      'CALL prc_update_promotion(?);',
      [idPromotion, code, startAt, endAt, useCountLimit,
        discountUsd, discountRatio, isActive]
    );
  }

  async delete({ idPromotion }) {
    await this.directQuery (
      'CALL prc_delete_promotion(?);',
      idPromotion
    );
  }

}

module.exports = {
  create: () => new Promotion
};
