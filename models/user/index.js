
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
        fun_get_string(NULL, c.name_str_id) companyName,
        fun_get_string(NULL, ct.name_str_id) companyCityName,
        fun_get_string(NULL, co.name_str_id) companyCountryName,
        area,
        street
        building_number,
        address_longitude,
        address_latitude,
        more_address_info,
        license_number,
        license_expir_at,
        establish_at,
        license_img_id,
				birth_date	birthDate,
				gender,
				fun_get_img(u.img_id)	imgUrl,
				role_id	roleId,
				is_blocked	isBlocked,
				is_active	isActive,
        is_accepted isAccepted,
        last_login_at lastLoginAt, 
        score,
        fun_is_user_admin(id_user) isAdmin
      FROM
        users u
        LEFT JOIN companies c ON id_company = company_id
        LEFT JOIN cities ct ON city_id = id_city
        LEFT JOIN countries co ON id_country = country_id
      WHERE 
        id_user = ${this.escapeSql(userId)}`;

    let dbRet = await this.directQuery(queryStr);

    return  { data: dbRet[0] };

  }

  async getAllFullInfo({
    limit, skip, filters, sorts
  }) {

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        users;`
      

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
        fun_is_user_admin(id_user) isAdmin
      FROM
        users`;

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
    hasMobileWhatsapp
  }) {
    let dbRet = await this.directQuery (
      'CALL prc_add_user(?, @new_record_id);',
      [firstName, lastName, email, mobile, hasMobileWhatsapp, 
        password, companyId, birthDate, gender, imgUrl, 
        roleId, isBlocked, isActive]
    );

    return { newId: dbRet[0][0].newRecordId };
  }

  async update({
    idUser, firstName, lastName, email, mobile, password, companyId, 
      birthDate, gender, imgUrl, roleId, isBlocked, isActive,
      isAccepted, lastLoginAt, hasMobileWhatsapp, score
  }) {
    await this.directQuery (
      'CALL prc_update_user(?);',
      [idUser, firstName, lastName, email, mobile, hasMobileWhatsapp, 
        password, companyId, birthDate, gender, imgUrl, roleId, 
        isBlocked, isActive, isAccepted, lastLoginAt, score]
    );
  }

  async accept ({
    usersIds, isAccepted
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
        [null, null]
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

}

module.exports = {
  create: () => new User,
  Cares,
  Codes
};
