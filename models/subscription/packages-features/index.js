
const Model = require('../../model');

class SubscriptionPackagesFeatures extends Model {
 
  async getAllFullInfo({
    limit, skip, filters, sorts
  }) {

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        subscription_packages_features;`
      

    let dataQuery =
      `SELECT
        subscription_package_id	subscriptionPackageId,
				subscription_feature_id	subscriptionFeatureId,
				feature_value	featureValue
      FROM
        subscription_packages_features`;

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

  async resetSubscriptionPackgeFeatures({
    subscriptionPackageId, 
    features //[{subscriptionFeatureId, featureValue}]
  }) {
    let queryStr = 'CALL prc_delete_all_subscription_packages_features(?);';
    let queryParams = [subscriptionPackageId];
    
    features.forEach(({
      subscriptionFeatureId, featureValue
    }) => {
      queryStr += 'CALL prc_add_subscription_packages_features(?);';
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
