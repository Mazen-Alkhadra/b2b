
const Model = require('../../model');

class UserSubscription extends Model {
  static TABLE_NAME = 'subscriptions';
  static PRIMARY_KEY = 'id_subscription';

  async getAllFullInfo({
    limit, skip, filters, sorts,
    groupby, subscriptionId
  }) {

    let subscriptionIdCond = !subscriptionId ? 'TRUE' :
      `id_subscription = ${this.escapeSql(subscriptionId)}`;

    if (groupby)
      groupby = {
        col: 'user_id',
        colAlias: 'userId',
        groupCountAlias: 'userGroupCount'
      };

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        subscriptions
      WHERE 
        ${subscriptionIdCond};`
      

    let dataQuery =
      `SELECT
        id_subscription	idSubscription,
				user_id	userId,
				subscription_package_id	subscriptionPackageId,
				payment_id	paymentId,
				promotion_id	promotionId,
        subscrib_at subscribAt,
				expir_at	expirAt,
				actual_cost_usd	actualCostUsd,
				is_active	isActive,
        fun_is_user_subscription_valid(id_subscription) isValid
      FROM
        subscriptions
      WHERE 
        ${subscriptionIdCond}`;

    let queryStr = countQuery + dataQuery;
    let filteredQuery = this.applyFilters(dataQuery, filters);
    queryStr = filteredQuery.finalQuery || queryStr;
    queryStr += this.getOrderClause(sorts);
    queryStr += this.getLimitClause({ limit, skip });


    let dbRet = await this.directQuery(queryStr);

    return {
      allCount: dbRet[0][0].allCount,
      groupCount: groupby ? dbRet[0][0][groupby.groupCountAlias] : 0,
      data: groupby ? this.group(dbRet[1], groupby.colAlias) : dbRet[1]
    };

  }

  async get ({ userId, sorts }) {
    let userCond = !userId ? 'TRUE' : 
      `user_id = ${this.escapeSql(userId)}`;

    let queryStr =
      `SELECT
        id_subscription	idSubscription,
				user_id	userId,
				subscription_package_id	subscriptionPackageId,
        fun_get_string(NULL, name_str_id) subscriptionPackageName,
        color subscriptionPackageColor,
				payment_id paymentId,
				promotion_id promotionId,
        subscrib_at subscribAt,
				s.expir_at expirAt,
				actual_cost_usd	actualCostUsd,
				s.is_active	isActive,
        fun_is_user_subscription_valid(id_subscription) isValid,
        fun_get_user_subscribe_feature_val(NULL, ${userId}, 'TENDERS_PER_MONTH', NULL) monthAllowTenderCnt,
        fun_get_user_tender_count(${userId}, 30) monthCreatTenderCnt,
        fun_get_user_subscribe_feature_val(NULL, ${userId}, 'TENDERS_PER_DAY', NULL) dayAllowTenderCnt,
        fun_get_user_tender_count(${userId}, 1) dayCreatTenderCnt,
        fun_get_user_subscribe_feature_val(NULL, ${userId}, 'ACCEPT_OFFERS_COUNT', 'SUM') -
          fun_get_offers_cnt_user_accept(${userId}, NULL, TRUE)  offersCntCanAccept
      FROM
        subscriptions s
        INNER JOIN subscription_packages ON 
          subscription_package_id = id_subscription_package
      WHERE 
        ${userCond}`;

    queryStr += this.getOrderClause(sorts);    
    let dbRet = await this.directQuery(queryStr);

    return { data: dbRet[0] };

  }

  async addNew ({
    userId, subscriptionPackageId, paymentId, promotionId,
    promotionCode, expirAt, actualCostUsd, isActive
  }) {
    let dbRet = await this.directQuery (
      'CALL prc_add_subscription(?, @new_record_id);',
      [userId, subscriptionPackageId, paymentId, promotionId,
        promotionCode, expirAt, actualCostUsd, isActive]
    );

    return { newId: dbRet[0][0].newRecId };
  }

  async update({
    idSubscription, userId, subscriptionPackageId, paymentId,
     promotionId, promotionCode, expirAt, actualCostUsd, isActive
  }) {
    await this.directQuery (
      'CALL prc_update_subscription(?);',
      [idSubscription, userId, subscriptionPackageId, paymentId, promotionId,
        promotionCode, expirAt, actualCostUsd, isActive]
    );
  }

  async delete({ idSubscription }) {
    await this.directQuery (
      'CALL prc_delete_subscription(?);',
      idSubscription
    );
  }

}

module.exports = {
  create: () => new UserSubscription
};
