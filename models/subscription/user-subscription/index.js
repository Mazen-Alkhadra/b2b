
const Model = require('../../model');

class UserSubscription extends Model {
  static TABLE_NAME = 'subscriptions';
  static PRIMARY_KEY = 'id_subscription';

  async getAllFullInfo({
    limit, skip, filters, sorts
  }) {

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        subscriptions;`
      

    let dataQuery =
      `SELECT
        id_subscription	idSubscription,
				user_id	userId,
				subscription_package_id	subscriptionPackageId,
				payment_id	paymentId,
				promotion_id	promotionId,
				expir_at	expirAt,
				actual_cost_usd	actualCostUsd,
				is_active	isActive
      FROM
        subscriptions`;

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

  async addNew ({
    userId, subscriptionPackageId, paymentId, promotionId,
    expirAt, actualCostUsd, isActive
  }) {
    let dbRet = await this.directQuery (
      'CALL prc_add_subscription(?, @new_record_id);',
      [userId, subscriptionPackageId, paymentId, promotionId,
        expirAt, actualCostUsd, isActive]
    );

    return { newId: dbRet[0][0].newRecordId };
  }

  async update({
    idSubscription, userId, subscriptionPackageId, paymentId,
     promotionId, expirAt, actualCostUsd, isActive
  }) {
    await this.directQuery (
      'CALL prc_update_subscription(?);',
      [idSubscription, userId, subscriptionPackageId, paymentId, promotionId, expirAt, actualCostUsd, isActive]
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
