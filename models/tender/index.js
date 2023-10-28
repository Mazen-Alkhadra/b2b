
const Model = require('../model');

class Tender extends Model {
  static TABLE_NAME = 'tenders';
  static PRIMARY_KEY = 'id_tender';

  async getAllFullInfo({
    limit, skip, filters, sorts
  }) {

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        tenders;`
      

    let dataQuery =
      `SELECT
        id_tender	idTender,
        creat_by_user_id  creatByUserId, 
        name,
				product_id	productId,
				quantity	quantity,
				\`from\`,
				\`to\`,
        deliver_before deliverBefore,
        city_id cityId,
        area,
        street,
        building_number buildingNumber,
        address_longitude addressLongitude,
        address_latitude addressLatitude,
        more_address_info moreAddressInfo,
        supplier_location supplierLocation,
        status,
        pay_method payMethod,
				closed_at	closedAt
      FROM
        tenders`;

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
    onlyCreatByUserId, onlyCareByUserId, tenderId,
    onlyUnCompleted, exceptUserTrash, reqUserId,
    limit, skip, filters, sorts
  }) {      
    
    let onlyCreatByUserCond = !onlyCreatByUserId ? 'TRUE' : 
      `t.creat_by_user_id = ${this.escapeSql(onlyCreatByUserId)}`;
    let onlyCareByUserCond = !onlyCareByUserId ? 'TRUE' : 
      `fun_is_user_care_tender(${this.escapeSql(onlyCareByUserId)}, id_tender)`;
    let tenderIdCond = !tenderId ? 'TRUE' :
      `id_tender = ${this.escapeSql(tenderId)}`;
    let unCompletedCond = !onlyUnCompleted ? 'TRUE' :
      '!fun_is_tender_complete_qntity(id_tender, FALSE)';
    let exceptUserTrashCond = !exceptUserTrash ? 'TRUE' : 
      `!fun_is_record_in_trash(id_tender, ${this.escapeSql(exceptUserTrash)}, 'TENDER')`;

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        tenders t 
      WHERE
        ${onlyCreatByUserCond} AND 
        ${onlyCareByUserCond} AND 
        ${tenderIdCond} AND 
        ${unCompletedCond} AND 
        ${exceptUserTrashCond};`;

    let dataQuery =
      `SELECT
        id_tender	idTender,
        creat_by_user_id  creatByUserId, 
        name,
				product_id	productId,
        fun_get_string(NULL, p.name_str_id) productName,
        fun_get_img(p.img_id) productImgUrl,
        fun_get_string(NULL, b.name_str_id) brandName,
        fun_get_string(NULL, c.name_str_id) categoryName,
				quantity	quantity,
				\`from\`,
				\`to\`,
        deliver_before deliverBefore,
        city_id cityId,
        fun_get_string(NULL, ct.name_str_id) cityName,
        fun_get_string(NULL, co.name_str_id) countryName,
        area,
        street,
        building_number buildingNumber,
        address_longitude addressLongitude,
        address_latitude addressLatitude,
        more_address_info moreAddressInfo,
        supplier_location supplierLocation,
        status,
        pay_method payMethod,
				closed_at	closedAt,
        u.score creatorScore,
        fun_is_record_seen_by_user(id_tender, ${this.escapeSql(reqUserId)}, 'TENDER') isTenderSeen,
        fun_get_offers_cnt_on_tender(id_tender) offersCnt,
        fun_is_user_trusted(t.creat_by_user_id) isCreatorTrusted
      FROM
        tenders t
        INNER JOIN users u ON id_user = creat_by_user_id
        INNER JOIN products p ON id_product = product_id
        INNER JOIN brands b ON p.brand_id = id_brand
        INNER JOIN categories c ON c.id_category = b.category_id
        LEFT JOIN cities ct ON city_id = id_city
        LEFT JOIN countries co ON country_id = id_country
      WHERE 
        ${onlyCreatByUserCond} AND 
        ${onlyCareByUserCond} AND 
        ${tenderIdCond} AND 
        ${unCompletedCond} AND 
        ${exceptUserTrashCond}`;

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

  async getB2B ({ userId, isPending, limit, skip, sorts }) {      

    userId = this.escapeSql(userId);
    let isPendingCond = !isPending ? `
      (
        (
          o.status = 'EXECUTED' AND
          o.creat_by_user_id = ${userId}
        ) OR
        t.creat_by_user_id = ${userId}
      ) AND 
      fun_is_tender_b2b(tender_id)` : 
      `o.status IN ('ACCEPTED', 'EXECUTED') AND  
      (
        o.creat_by_user_id = ${userId} OR
        t.creat_by_user_id = ${userId}
      ) AND 
      NOT fun_is_tender_b2b(id_tender)`;
      
    let countQuery = `
      SELECT 
        COUNT(*) allCount
      FROM
        tenders t
        INNER JOIN offers o ON tender_id = id_tender
      WHERE 
        ${isPendingCond};`;

    let dataQuery = `
      SELECT
        id_tender	idTender,
        t.creat_by_user_id  tenderCreatorUserId, 
        name,
        product_id	productId,
        fun_get_string(NULL, p.name_str_id) productName,
        fun_get_img(p.img_id) productImgUrl,
        fun_get_string(NULL, b.name_str_id) brandName,
        fun_get_string(NULL, c.name_str_id) categoryName,
        fun_get_offers_cnt_on_tender(id_tender) offersCnt,
        fun_is_user_trusted(t.creat_by_user_id) isTenderCreatorTrusted,
        t.quantity tenderQuantity,
        \`from\`,
        \`to\`,
        t.city_id cityId,
        t.area,
        t.street,
        t.building_number buildingNumber,
        t.address_longitude addressLongitude,
        t.address_latitude addressLatitude,
        t.more_address_info moreAddressInfo,
        t.supplier_location supplierLocation,
        t.status,
        closed_at closedAt
      FROM
        tenders t
        INNER JOIN offers o ON tender_id = id_tender
        INNER JOIN products p ON id_product = product_id
        INNER JOIN brands b ON p.brand_id = id_brand
        INNER JOIN categories c ON c.id_category = b.category_id
      WHERE 
        ${isPendingCond}`;

    let queryStr = countQuery + dataQuery;
    queryStr += this.getOrderClause(sorts);
    queryStr += this.getLimitClause({ limit, skip });
    let dbRet = await this.directQuery(queryStr);
    
    return { 
      allCount: dbRet[0][0].allCount,
      data: dbRet[1] 
    };
  }

  async getContactInfo ({ userId, offerId, tenderId }) {      

    let queryStr = 'CALL prc_get_contact_info(?);';

    let dbRet = await this.directQuery(queryStr, [userId, offerId, tenderId]);

    return { data: dbRet[0][0] };
  }

  async addNew({
    creatByUserId, name, productId, quantity,
    from, to, deliverBefore, cityId, area, 
    street, buildingNumber, addressLongitude, 
    addressLatitude, moreAddressInfo, 
    supplierLocation, status, closedAt,
    payMethod
  }) {
    let dbRet = await this.directQuery (
      'CALL prc_add_tender(?, @new_record_id);',
      [creatByUserId, name, productId, quantity,
        from, to, deliverBefore, cityId, area, 
        street, buildingNumber, addressLongitude, 
        addressLatitude, moreAddressInfo, 
        supplierLocation, status, payMethod, closedAt]
    );

    return { newId: dbRet[0][0].newRecId };
  }

  async update({
    idTender, creatByUserId, name, productId, quantity,
    from, to, deliverBefore, cityId, area, 
    street, buildingNumber, addressLongitude, 
    addressLatitude, moreAddressInfo, 
    supplierLocation, status, closedAt,
    payMethod,
  }) {
    await this.directQuery (
      'CALL prc_update_tender(?);',
      [idTender, creatByUserId, name, productId, quantity,
        from, to, deliverBefore, cityId, area, 
        street, buildingNumber, addressLongitude, 
        addressLatitude, moreAddressInfo, 
        supplierLocation, status, payMethod, closedAt]
    );
  }

  async checkComingTenders() {
    await this.directQuery ('CALL prc_check_coming_tenders();');
  }

  async delete({ idTender }) {
    await this.directQuery (
      'CALL prc_delete_tender(?);',
      idTender
    );
  }

}

module.exports = {
  create: () => new Tender
};
