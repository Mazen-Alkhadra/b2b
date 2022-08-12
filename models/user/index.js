
const Model = require('../model');
const Cares = require('./cares');
const Codes = require('./codes');

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
        img_id	imgId,
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

      return dbRet[0];      
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
				company_id	companyId,
				birth_date	birthDate,
				gender	gender,
				img_id	imgId,
				role_id	roleId,
				is_blocked	isBlocked,
				is_active	isActive,
        is_accepted isAccepted,
        last_login_at lastLoginAt, 
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
    birthDate, gender, imgUrl, roleId, isBlocked, isActive
  }) {
    let dbRet = await this.directQuery (
      'CALL prc_add_user(?, @new_record_id);',
      [firstName, lastName, email, mobile, password, companyId,
        birthDate, gender, imgUrl, roleId, isBlocked, isActive]
    );

    return { newId: dbRet[0][0].newRecordId };
  }

  async update({
    idUser, firstName, lastName, email, mobile, password, companyId, 
      birthDate, gender, imgId, roleId, isBlocked, isActive,
      isAccepted, lastLoginAt
  }) {
    await this.directQuery (
      'CALL prc_update_user(?);',
      [idUser, firstName, lastName, email, mobile, password, companyId, 
        birthDate, gender, imgId, roleId, isBlocked, isActive, isAccepted,
        lastLoginAt]
    );
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
