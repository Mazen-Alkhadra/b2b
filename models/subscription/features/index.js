
const Model = require('../../model');
const StringModel = require('../../resource').String;

class SubscriptionFeature extends Model {
  static TABLE_NAME = 'subscription_features';
  static PRIMARY_KEY = 'id_subscription_feature';

  async getAllFullInfo({
    limit, skip, filters, sorts
  }) {

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        subscription_features;`
      

    let dataQuery =
      `SELECT
				id_subscription_feature	idSubscriptionFeature,
				fun_get_string(NULL, name_str_id)	nameEn,
				fun_get_string(NULL, description_str_id)	descriptionEn
      FROM
        subscription_features`;

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
    idSubscriptionFeature, nameEn, descriptionEn
  }) {
    let strModel = StringModel.create();
    let nameStrId = await strModel.addNewString({enStr: nameEn});
    let descStrId = await strModel.addNewString({enStr: descriptionEn});

    let dbRet = await this.directQuery (
      'CALL prc_add_subscription_feature(?, @new_record_id);',
      [idSubscriptionFeature, nameStrId, descStrId]
    );

    return { newId: dbRet[0][0].newRecordId };
  }

  async update({
    idSubscriptionFeature, nameEn, descriptionEn
  }) {
    let strModel = StringModel.create();
    await strModel.updateString({
      tableName: SubscriptionFeature.TABLE_NAME,
      idColName: SubscriptionFeature.PRIMARY_KEY,
      idColValue: idSubscriptionFeature,
      strColName: 'name_str_id',
      enStr: nameEn
    });

    await strModel.updateString({
      tableName: SubscriptionFeature.TABLE_NAME,
      idColName: SubscriptionFeature.PRIMARY_KEY,
      idColValue: idSubscriptionFeature,
      strColName: 'description_str_id',
      enStr: descriptionEn
    });

  }

  async delete({ idSubscriptionFeature }) {
    await this.directQuery (
      'CALL prc_delete_subscription_feature(?);',
      idSubscriptionFeature
    );
  }

}

module.exports = {
  create: () => new SubscriptionFeature
};
