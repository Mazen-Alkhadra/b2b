
const Model = require('../model');
const Cares = require('./cares');
const Codes = require('./codes');
const ACModel = require('../access-control');

class User extends Model {
  static TABLE_NAME = 'users';
  static PRIMARY_KEY = 'id_user';

  async findUser ({
    loginName, email, mobile, userId
  }) {
    let emailCond = !email ? 'TRUE' : 
      `email = ${this.escapeSql(email)}`;
    let mobileCond = !mobile ? 'TRUE' : 
      `mobile = ${this.escapeSql(mobile)}`;
    let userIdCond = !userId ? 'TRUE' : 
      `id_user = ${this.escapeSql(userId)}`;
    let loginNameCond = !loginName ? 'TRUE' : 
      `email = ${this.escapeSql(loginName)} OR 
      mobile = ${this.escapeSql(loginName)}`;

    let queryStr = 
      `SELECT
        id_user	idUser,
        first_name	firstName,
        last_name	lastName,
        email	email,
        mobile	mobile,
        password	password,
        company_id	companyId,
        birth_date	birthDate,
        gender	gender,
        fun_get_img(img_id)	imgUrl,
        role_id	roleId,
        is_blocked	isBlocked,
        is_active	isActive,
        is_accepted isAccepted, 
        notes,
        fun_is_user_admin(id_user) isAdmin
      FROM
        users
      WHERE
       ${emailCond} AND 
       ${mobileCond} AND 
       ${userIdCond} AND 
       ${loginNameCond};`;

      let dbRet = await this.directQuery(queryStr);

      if(dbRet.length == 0 ||  dbRet.length > 1) 
        return null;

      dbRet[0].ac = (await ACModel.Role.create()
        .getACPermissions({roleId: dbRet[0].roleId})).data;

      return dbRet[0];      
  }

  async getProfileInfo ({ userId }) {

    let queryStr =
      `SELECT
        id_user	idUser,
				first_name	firstName,
				last_name	lastName,
				email,
				mobile,
        has_mobile_whatsapp hasMobileWhatsapp,
				company_id companyId,
        company_type_id companyTypeId,
        fun_get_string(NULL, c.name_str_id) companyName,
        fun_get_string(NULL, ct.name_str_id) companyCityName,
        fun_get_string(NULL, co.name_str_id) companyCountryName,
        fun_get_string(NULL, ctp.name_str_id) companyTypeName,
        area,
        street
        building_number,
        address_longitude,
        address_latitude,
        more_address_info,
        license_number,
        license_expir_at,
        establish_at,
        fun_get_img(license_img_id) licenseImgUrl,
				birth_date	birthDate,
				gender,
				fun_get_img(u.img_id)	imgUrl,
				role_id	roleId,
				is_blocked	isBlocked,
				is_active	isActive,
        is_accepted isAccepted,
        last_login_at lastLoginAt, 
        score,
        notes,
        fun_is_user_admin(id_user) isAdmin
      FROM
        users u
        LEFT JOIN companies c ON id_company = company_id
        LEFT JOIN company_types ctp ON id_company_type = company_type_id
        LEFT JOIN cities ct ON city_id = id_city
        LEFT JOIN countries co ON id_country = country_id
      WHERE 
        id_user = ${this.escapeSql(userId)}`;

    let dbRet = await this.directQuery(queryStr);

    return  { data: dbRet[0] };

  }

  async getAllFullInfo({
    limit, skip, filters, sorts,
    onlyAdmins, careTenderId
  }) {

    let isAdminCond = !onlyAdmins ? 'TRUE' : 
      `fun_is_user_admin(id_user) = TRUE`;
    let careTenderCond = !careTenderId ? 'TRUE' : 
      `fun_is_user_care_tender(id_user, '${careTenderId}') = TRUE`;

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        users
      WHERE 
        ${isAdminCond} AND 
        ${careTenderCond};`
      

    let dataQuery =
      `SELECT
        id_user	idUser,
				first_name	firstName,
				last_name	lastName,
				email	email,
				mobile	mobile,
        has_mobile_whatsapp hasMobileWhatsapp,
				company_id	companyId,
				birth_date	birthDate,
				gender	gender,
				fun_get_img(img_id)	imgUrl,
				role_id	roleId,
				is_blocked	isBlocked,
				is_active	isActive,
        is_accepted isAccepted,
        last_login_at lastLoginAt, 
        score,
        notes,
        fun_is_user_admin(id_user) isAdmin
      FROM
        users
      WHERE 
        ${isAdminCond} AND 
        ${careTenderCond}`;

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
    firstName, lastName, email, mobile, password, companyId, 
    birthDate, gender, imgUrl, roleId, isBlocked, isActive,
    hasMobileWhatsapp, notes
  }) {
    let dbRet = await this.directQuery (
      'CALL prc_add_user(?, @new_record_id);',
      [firstName, lastName, email, mobile, hasMobileWhatsapp, 
        password, companyId, birthDate, gender, imgUrl, 
        roleId, isBlocked, isActive, notes]
    );

    return { newId: dbRet[0][0].newRecId };
  }

  async update({
    idUser, firstName, lastName, email, mobile, password, companyId, 
      birthDate, gender, imgUrl, roleId, isBlocked, isActive,
      isAccepted, lastLoginAt, hasMobileWhatsapp, score, notes
  }) {
    await this.directQuery (
      'CALL prc_update_user(?);',
      [idUser, firstName, lastName, email, mobile, hasMobileWhatsapp, 
        password, companyId, birthDate, gender, imgUrl, roleId, 
        isBlocked, isActive, isAccepted, lastLoginAt, score, notes]
    );
  }

  async accept ({
    usersIds, isAccepted, notes
  }) {
    
    if(!Array.isArray(usersIds) || !usersIds.length)
      return;

    let queryStr = '';
    let queryParams = [];

    usersIds.forEach(userId => {
      queryStr += 'CALL prc_update_user(?, ?, ?, ?);';
      queryParams.push (
        userId, 
        [null, null, null, null, null, null, null, null, null, null, null, null, null],
        isAccepted, 
        [null, null, notes]
      );
    });
    
    await this.directQuery ( queryStr, ...queryParams );
  }

  async delete({ idUser }) {
    await this.directQuery (
      'CALL prc_delete_user(?);',
      idUser
    );
  }

  fixMobile({number}) {
    if(!number || !number.length)
      return null;
    
    if(number.search(/[^+\d]/g) > -1) 
      return null;
    
    if(number.length < 12) 
      number = '+971' + number;

    number = number.replace(/^0{2}/g, '+');

    return number;
  }

}

module.exports = {
  create: () => new User,
  Cares,
  Codes
};
