
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

  async get ({ userId }) {      

    let userCond = !userId ? 'TRUE' : 
      `creat_by_user_id = ${this.escapeSql(userId)}`;

    let queryStr =
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
				closed_at	closedAt
      FROM
        tenders
      WHERE 
        ${userCond}`;

    let dbRet = await this.directQuery(queryStr);

    return { data: dbRet[0] };

  }

  async addNew({
    creatByUserId, name, productId, quantity,
    from, to, deliverBefore, cityId, area, 
    street, buildingNumber, addressLongitude, 
    addressLatitude, moreAddressInfo, 
    supplierLocation, status, closedAt
  }) {
    let dbRet = await this.directQuery (
      'CALL prc_add_tender(?, @new_record_id);',
      [creatByUserId, name, productId, quantity,
        from, to, deliverBefore, cityId, area, 
        street, buildingNumber, addressLongitude, 
        addressLatitude, moreAddressInfo, 
        supplierLocation, status, closedAt]
    );

    return { newId: dbRet[0][0].newRecordId };
  }

  async update({
    idTender, creatByUserId, name, productId, quantity,
    from, to, deliverBefore, cityId, area, 
    street, buildingNumber, addressLongitude, 
    addressLatitude, moreAddressInfo, 
    supplierLocation, status, closedAt
  }) {
    await this.directQuery (
      'CALL prc_update_tender(?);',
      [idTender, creatByUserId, name, productId, quantity,
        from, to, deliverBefore, cityId, area, 
        street, buildingNumber, addressLongitude, 
        addressLatitude, moreAddressInfo, 
        supplierLocation, status, closedAt]
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
