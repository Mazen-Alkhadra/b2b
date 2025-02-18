
const Model = require('../model');

class Offer extends Model {
  static TABLE_NAME = 'offers';
  static PRIMARY_KEY = 'id_offer';
  static STATUS = {
    PENDING: 'PENDING', 
    REJECTED: 'REJECTED', 
    ACCEPTED: 'ACCEPTED', 
    EXECUTED: 'EXECUTED'
  };

  async getAllFullInfo({
    limit, skip, filters, sorts,
    offerId
  }) {

    let offerIdCond = !offerId ? 'TRUE' : `id_offer = ${this.escapeSql(offerId)}`;

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        offers
      WHERE 
        ${offerIdCond};`
      

    let dataQuery =
      `SELECT
        id_offer	idOffer,
				tender_id	tenderId,
        o.creat_by_user_id creatByUserId,
        o.quantity,
				price_USD	priceUSD,
				b_include_delivery	bIncludeDelivery,
				delivery_cost	deliveryCost,
				o.delivery_address	deliveryAddress,
        o.delivery_at deliveryAt,
				o.status	status,
        o.tax,
        o.city_id cityId,
				accepted_at	acceptedAt,
				excuted_at	excutedAt,
        o.creat_at creatAt,
        t.creat_by_user_id tenderCreatorByUserId,
        t.product_id productId,
        t.quantity tenderQuantity,
        t.name tenderName,
        t.serial_num tenderSerialNum 
      FROM
        offers o
        INNER JOIN tenders t ON tender_id = id_tender
      WHERE 
        ${offerIdCond}`;

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

  async get ({
    tenderId, creatByUserId,
    tenderCreatorByUserId,
    statusArr, exceptUserTrash,
    reqUserId, limit, skip, sorts
  }) {

    let tenderCond = !tenderId ? 'TRUE' :
      `tender_id = ${this.escapeSql(tenderId)}`;
    let creatorCond = !creatByUserId ? 'TRUE' : 
      `o.creat_by_user_id = ${this.escapeSql(creatByUserId)}`;
    let tenderCreatorCond = !tenderCreatorByUserId ? 'TRUE' : 
      `t.creat_by_user_id = ${tenderCreatorByUserId}`;
    let statusArrCond = !Array.isArray(statusArr) || !statusArr.length ? 'TRUE' : 
      `o.status IN (${this.escapeSql(statusArr)})`;
    let exceptUserTrashCond = !exceptUserTrash ? 'TRUE' : 
      `!fun_is_record_in_trash(id_offer, ${this.escapeSql(exceptUserTrash)}, 'OFFER')`;

    let countQuery =
    `SELECT
      Count(*) allCount
    FROM
      offers o
      INNER JOIN tenders t ON tender_id = id_tender
    WHERE 
      ${tenderCond} AND 
      ${tenderCreatorCond} AND 
      ${creatorCond} AND 
      ${statusArrCond} AND
      ${exceptUserTrashCond};`

    let dataQuery =
      `SELECT
        id_offer	idOffer,
				tender_id	tenderId,
        fun_get_string(NULL, p.name_str_id) productName,
        fun_get_img(p.img_id) productImgUrl,
        fun_get_string(NULL, b.name_str_id) brandName,
        fun_get_string(NULL, c.name_str_id) categoryName,
        o.creat_by_user_id creatByUserId,
        fun_is_user_trusted(o.creat_by_user_id) isOfferCreatorTrusted,
        o.quantity,
				price_USD	priceUSD,
				b_include_delivery	bIncludeDelivery,
				delivery_cost	deliveryCost,
				o.delivery_address	deliveryAddress,
        o.delivery_at deliveryAt,
				o.status	status,
        o.tax,
        o.city_id offerCityId,
        fun_get_string(NULL, ct.name_str_id) offerCityName,
        fun_get_string(NULL, co.name_str_id) offerCountryName,
				accepted_at	acceptedAt,
				excuted_at	excutedAt,
        o.creat_at creatAt,
        t.creat_by_user_id tenderCreatorByUserId,
        fun_is_user_trusted(t.creat_by_user_id) isTenderCreatorTrusted,
        t.product_id productId,
        t.quantity tenderQuantity,
        u.score offerCreatorScore,
        fun_is_record_seen_by_user(id_offer, ${this.escapeSql(reqUserId)}, 'OFFER') isOfferSeen
      FROM
        offers o
        INNER JOIN tenders t ON tender_id = id_tender
        INNER JOIN products p ON id_product = product_id
        INNER JOIN brands b ON p.brand_id = id_brand
        INNER JOIN categories c ON c.id_category = b.category_id
        INNER JOIN users u ON u.id_user = o.creat_by_user_id
        LEFT JOIN cities ct ON o.city_id = id_city
        LEFT JOIN countries co ON country_id = id_country
      WHERE 
        ${tenderCond} AND 
        ${tenderCreatorCond} AND 
        ${creatorCond} AND 
        ${statusArrCond} AND
        ${exceptUserTrashCond}`;

    let queryStr = countQuery + dataQuery;
    queryStr += this.getOrderClause(sorts);
    queryStr += this.getLimitClause({ limit, skip });
    let dbRet = await this.directQuery(queryStr);

    return { 
      allCount: dbRet[0][0].allCount,
      data: dbRet[1]
     };

  }

  async addNew({
    tenderId, creatByUserId, quantity, priceUSD, 
    bIncludeDelivery, deliveryCost, deliveryAddress,
    status, tax, cityId, acceptedAt, excutedAt,
    deliveryAt
  }) {
    let dbRet = await this.directQuery (
      'CALL prc_add_offer(?, @new_record_id);',
      [tenderId, creatByUserId, quantity, priceUSD, bIncludeDelivery, 
        deliveryCost, deliveryAddress, deliveryAt, status, tax, cityId,
        acceptedAt, excutedAt]
    );

    return { newId: dbRet[0][0].newRecordId };
  }

  async update({
    idOffer, tenderId, creatByUserId, quantity, priceUSD, 
    bIncludeDelivery, deliveryCost, deliveryAddress, status,
    tax, cityId, acceptedAt, excutedAt, deliveryAt
  }) {
    await this.directQuery (
      'CALL prc_update_offer(?);',
      [idOffer, tenderId, creatByUserId, quantity, priceUSD, 
        bIncludeDelivery, deliveryCost, deliveryAddress, 
        deliveryAt, status, tax, cityId, acceptedAt, excutedAt]
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
  create: () => new Offer,
  STATUS: Offer.STATUS
};
