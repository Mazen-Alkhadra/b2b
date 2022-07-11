
const Model = require('../../model');

class SubscriptionPackagesFeatures extends Model {
 
  async getAllFullInfo({
    limit, skip, filters, sorts,
    subscriptionPackageId
  }) {

    let packageCond = !subscriptionPackageId ? 'TRUE' :
      `subscription_package_id = ${this.escapeSql(subscriptionPackageId)}`;

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        subscription_packages_features
      WHERE 
        ${packageCond};`
      

    let dataQuery =
      `SELECT
        subscription_package_id	subscriptionPackageId,
				subscription_feature_id	subscriptionFeatureId,
				feature_value	featureValue
      FROM
        subscription_packages_features
      WHERE 
        ${packageCond}`;

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

  async resetSubscriptionPackgeFeatures({
    subscriptionPackageId, 
    features //[{subscriptionFeatureId, featureValue}]
  }) {
    let queryStr = 'CALL prc_delete_all_subscription_packages_features(?);';
    let queryParams = [subscriptionPackageId];
    
    features.forEach(({
      subscriptionFeatureId, featureValue
    }) => {
      queryStr += 'CALL prc_add_subscription_packages_feature(?);';
      queryParams.push([
        subscriptionPackageId, subscriptionFeatureId, featureValue
      ]);
    });

    await this.directQuery(queryStr, ...queryParams);
  }
}

module.exports = {
  create: () => new SubscriptionPackagesFeatures
};
