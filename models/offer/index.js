
const Model = require('../model');

class Offer extends Model {
  static TABLE_NAME = 'offers';
  static PRIMARY_KEY = 'id_offer';

  async getAllFullInfo({
    limit, skip, filters, sorts
  }) {

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        offers;`
      

    let dataQuery =
      `SELECT
        id_offer	idOffer,
				tender_id	tenderId,
        o.creat_by_user_id creatByUserId,
				price_USD	priceUSD,
				b_include_delivery	bIncludeDelivery,
				delivery_cost	deliveryCost,
				o.delivery_address	deliveryAddress,
				status	status,
				accepted_at	acceptedAt,
				excuted_at	excutedAt,
        o.creat_at creatAt,
        t.creat_by_user_id tenderCreatorByUserId,
        t.product_id productId
      FROM
        offers o
        INNER JOIN tenders t ON tender_id = id_tender`;

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
    tenderId, creatByUserId, priceUSD, bIncludeDelivery,
    deliveryCost, deliveryAddress, status, acceptedAt,
    excutedAt
  }) {
    let dbRet = await this.directQuery (
      'CALL prc_add_offer(?, @new_record_id);',
      [tenderId, creatByUserId, priceUSD, bIncludeDelivery, 
        deliveryCost, deliveryAddress, status, acceptedAt, excutedAt]
    );

    return { newId: dbRet[0][0].newRecordId };
  }

  async update({
    idOffer, tenderId, creatByUserId, priceUSD, bIncludeDelivery, 
    deliveryCost, deliveryAddress, status, acceptedAt, excutedAt
  }) {
    await this.directQuery (
      'CALL prc_update_offer(?);',
      [idOffer, tenderId, creatByUserId, priceUSD, bIncludeDelivery,
        deliveryCost, deliveryAddress, status, acceptedAt, excutedAt]
    );
  }

  async delete({ idOffer }) {
    await this.directQuery (
      'CALL prc_delete_offer(?);',
      idOffer
    );
  }

}

module.exports = {
  create: () => new Offer
};
