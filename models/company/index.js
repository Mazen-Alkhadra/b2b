
const Model = require('../model');
const StringModel = require('../resource').String;

class Company extends Model {
  static TABLE_NAME = 'companies';
  static PRIMARY_KEY = 'id_company';

  async getAllFullInfo({
    limit, skip, filters, sorts
  }) {

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        companies;`
      

    let dataQuery =
      `SELECT
        id_company	idCompany,
				fun_get_string(NULL, c.name_str_id)	nameEn,
        company_type_id companyTypeId, 
				fun_get_string(NULL, ct.name_str_id) comanyTypeNameEn,
        fun_get_string(NULL, ct.description_str_id) comanyTypeDescriptionEn,
				city_id cityId,
        area,
        street,
        building_number buildingNumber,
        address_longitude addressLongitude,
        address_latitude addressLatitude,
        more_address_info moreAddressInfo,
        license_number licenseNumber,
        license_expir_at licenseExpirAt,
        DATE(establish_at) establishAt,
        fun_get_img(license_img_id) licenseImgUrl
      FROM
        companies c
        LEFT JOIN company_types ct ON compay_type_id = id_company_type`;

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
    nameEn, companyTypeId, licenseNumber, establishAt,
    licenseImgUrl, cityId, area, street, buildingNumber,
    addressLongitude, addressLatitude, moreAddressInfo, 
    licenseExpirAt
  }) {
    let nameStrId = await StringModel.create().addNewString({enStr: nameEn});

    let dbRet = await this.directQuery (
      'CALL prc_add_company(?, @new_record_id);',
      [nameStrId, companyTypeId, cityId, area, street, buildingNumber,
        addressLongitude, addressLatitude, moreAddressInfo,
        licenseNumber, licenseExpirAt, establishAt, licenseImgUrl]
    );

    return { newId: dbRet[0][0].newRecordId };
  }

  async update({
    idCompany, nameEn, companyTypeId, licenseNumber, establishAt,
    licenseImgUrl, cityId, area, street, buildingNumber,
    addressLongitude, addressLatitude, moreAddressInfo,
    licenseExpirAt
  }) {

    await StringModel.create().updateString({
      tableName: Company.TABLE_NAME,
      idColName: Company.PRIMARY_KEY,
      idColValue: idCompany,
      strColName: 'name_str_id',
      enStr: nameEn
    });

    await this.directQuery (
      'CALL prc_update_company(?);',
      [idCompany, companyTypeId, cityId, area, street, buildingNumber,
        addressLongitude, addressLatitude, moreAddressInfo,
        licenseNumber, licenseExpirAt, establishAt, licenseImgUrl]
    );
  }

  async delete({ idCompany }) {
    await this.directQuery (
      'CALL prc_delete_company(?);',
      idCompany
    );
  }

}

module.exports = {
  create: () => new Company
};
