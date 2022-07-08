
const Model = require('../../model');
const StringModel = require('../../resource').String;

class SubscriptionPackage extends Model {
  static TABLE_NAME = 'subscription_packages';
  static PRIMARY_KEY = 'id_subscription_package';

  async getAllFullInfo({
    limit, skip, filters, sorts
  }) {

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        subscription_packages;`
      

    let dataQuery =
      `SELECT
        id_subscription_package	idSubscriptionPackage,
				fun_get_string(NULL, name_str_id)	nameEn,
				fun_get_string(NULL, description_str_id)	descriptionEn,
				price_usd_per_month	priceUsdPerMonth,
				price_usd_per_year	priceUsdPerYear,
				img_id imgId,
				expir_at	expirAt,
				validity_seconds	validitySeconds,
				is_active	isActive
      FROM
        subscription_packages`;

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
    nameEn, descriptionEn, priceUsdPerMonth, priceUsdPerYear,
    imgUrl, expirAt, validitySeconds, isActive
  }) {
    let strModel = StringModel.create();
    let nameStrId = await strModel.addNewString({enStr: nameEn});
    let descStrId = await strModel.addNewString({enStr: descriptionEn});

    let dbRet = await this.directQuery (
      'CALL prc_add_subscription_package(?, @new_record_id);',
      [nameStrId, descStrId, priceUsdPerMonth, priceUsdPerYear, 
        imgUrl, expirAt, validitySeconds, isActive]
    );

    return { newId: dbRet[0][0].newRecordId };
  }

  async update({
    idSubscriptionPackage, nameEn, descriptionEn, priceUsdPerMonth,
    priceUsdPerYear, imgUrl, expirAt, validitySeconds, isActive
  }) {
    let strModel = StringModel.create();
    await strModel.updateString({
      tableName: SubscriptionPackage.TABLE_NAME,
      idColName: SubscriptionPackage.PRIMARY_KEY,
      idColValue: idSubscriptionPackage,
      strColName: 'name_str_id',
      enStr: nameEn
    });

    await strModel.updateString({
      tableName: SubscriptionPackage.TABLE_NAME,
      idColName: SubscriptionPackage.PRIMARY_KEY,
      idColValue: idSubscriptionPackage,
      strColName: 'description_str_id',
      enStr: descriptionEn
    });

    await this.directQuery (
      'CALL prc_update_subscription_package(?);',
      [idSubscriptionPackage, priceUsdPerMonth, priceUsdPerYear, 
        imgUrl, expirAt, validitySeconds, isActive]
    );
  }

  async delete({ idSubscriptionPackage }) {
    await this.directQuery (
      'CALL prc_delete_subscription_package(?);',
      idSubscriptionPackage
    );
  }

}

module.exports = {
  create: () => new SubscriptionPackage
};
