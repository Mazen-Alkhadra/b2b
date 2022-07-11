
const Model = require('../model');

class ContactInfo extends Model {
  static TABLE_NAME = 'contact_info';
  static PRIMARY_KEY = 'id_contact_info';

  async getAllFullInfo({
    limit, skip, filters, sorts
  }) {

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        contact_info;`
      

    let dataQuery =
      `SELECT
        id_contact_info	idContactInfo,
				address	address,
				mobile	mobile,
				phone	phone,
				email	email,
				more_info	moreInfo,
				is_active	isActive
      FROM
        contact_info`;

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

  async addNew({
    address, mobile, phone, email, moreInfo, isActive
  }) {
    let dbRet = await this.directQuery (
      'CALL prc_add_contact_info(?, @new_record_id);',
      [address, mobile, phone, email, moreInfo, isActive]
    );

    return { newId: dbRet[0][0].newRecordId };
  }

  async update({
    idContactInfo, address, mobile, phone, email, moreInfo, isActive
  }) {
    await this.directQuery (
      'CALL prc_update_contact_info(?);',
      [idContactInfo, address, mobile, phone, email, moreInfo, isActive]
    );
  }

  async delete({ idContactInfo }) {
    await this.directQuery (
      'CALL prc_delete_contact_info(?);',
      idContactInfo
    );
  }

}

module.exports = {
  create: () => new ContactInfo
};
