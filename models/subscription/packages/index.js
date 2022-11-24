
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
				price_usd priceUsd,
				fun_get_img(img_id) imgUrl,
				expir_at	expirAt,
				validity_seconds	validitySeconds,
				is_active	isActive
      FROM
        subscription_packages`;

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

  async get ({ filters, sorts }) {    

    let queryStr =
      `SELECT
        id_subscription_package	idSubscriptionPackage,
				fun_get_string(NULL, sp.name_str_id)	nameEn,
				fun_get_string(NULL, sp.description_str_id)	descriptionEn,
				price_usd priceUsd,
				fun_get_img(img_id) imgUrl,
				expir_at	expirAt,
				validity_seconds	validitySeconds,
				is_active	isActive,
        subscription_feature_id	subscriptionFeatureId,
        fun_get_string(NULL, sf.name_str_id)	featureNameEn,
				fun_get_string(NULL, sf.description_str_id) featureDescriptionEn,
				feature_value	featureValue
      FROM
        subscription_packages sp
        INNER JOIN subscription_packages_features ON 
          subscription_package_id = id_subscription_package
        INNER JOIN subscription_features sf ON 
          id_subscription_feature = subscription_feature_id`;

    let filteredQuery = this.applyFilters(queryStr, filters);
    queryStr = filteredQuery.finalQuery || queryStr;
    queryStr += this.getOrderClause(sorts);

    let dbRet = await this.directQuery(queryStr);
    let ret = {};

    dbRet.forEach(pkg => {
      ret[pkg.idSubscriptionPackage] = ret[pkg.idSubscriptionPackage] ||
      {
        ...pkg,
        features: [],
        subscriptionFeatureId: null,
        featureNameEn: null,
        featureDescriptionEn: null,
        featureValue: null
      };

      ret[pkg.idSubscriptionPackage].features.push({
        subscriptionFeatureId: pkg.subscriptionFeatureId, 
        featureNameEn: pkg.featureNameEn, 
        featureDescriptionEn: pkg.featureDescriptionEn, 
        featureValue: pkg.featureValue
      })
    });

    return { data: Object.values(ret) };
  }

  async addNew({
    nameEn, descriptionEn, priceUsd, imgUrl, 
    expirAt, validitySeconds, isActive
  }) {
    let strModel = StringModel.create();
    let nameStrId = await strModel.addNewString({enStr: nameEn});
    let descStrId = await strModel.addNewString({enStr: descriptionEn});

    let dbRet = await this.directQuery (
      'CALL prc_add_subscription_package(?, @new_record_id);',
      [nameStrId, descStrId, priceUsd, imgUrl, 
        expirAt, validitySeconds, isActive]
    );

    return { newId: dbRet[0][0].newRecordId };
  }

  async update({
    idSubscriptionPackage, nameEn, descriptionEn, priceUsd, imgUrl,
    expirAt, validitySeconds, isActive
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
      [idSubscriptionPackage, priceUsd, imgUrl, 
        expirAt, validitySeconds, isActive]
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
