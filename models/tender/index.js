
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
    onlyUnCompleted
  }) {      

    let onlyCreatByUserCond = !onlyCreatByUserId ? 'TRUE' : 
      `t.creat_by_user_id = ${this.escapeSql(onlyCreatByUserId)}`;
    let onlyCareByUserCond = !onlyCareByUserId ? 'TRUE' : 
      `fun_is_user_care_tender(${this.escapeSql(onlyCareByUserId)}, id_tender)`;
    let tenderIdCond = !tenderId ? 'TRUE' :
      `id_tender = ${this.escapeSql(tenderId)}`;
    let unCompletedCond = !onlyUnCompleted ? 'TRUE' :
      'fun_is_tender_complete_qntity(id_tender, FALSE)';

    let queryStr =
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
        u.score creatorScore
      FROM
        tenders t
        INNER JOIN users u ON id_user = creat_by_user_id
        INNER JOIN products p ON id_product = product_id
        INNER JOIN brands b ON p.brand_id = id_brand
        INNER JOIN categories c ON c.id_category = b.category_id
      WHERE 
        ${onlyCreatByUserCond} AND 
        ${onlyCareByUserCond} AND 
        ${tenderIdCond} AND 
        ${unCompletedCond}`;

    let dbRet = await this.directQuery(queryStr);

    return { data: dbRet };

  }

  async getB2B ({ userId, isPending }) {      

    let queryStr = isPending ? 'CALL prc_get_pending_b2b_tenders(?);' : 
      'CALL prc_get_b2b_tenders(?);';

    let dbRet = await this.directQuery(queryStr, userId);

    return { data: dbRet[0] };
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
