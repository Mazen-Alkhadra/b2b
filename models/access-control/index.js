
const Model = require('../model');
const Role = require('./role');
const Resource = require('./resource');
const Permission = require('./permission');

class AC extends Model {

  async isUserAdmin({idUser}) {
    let dbRet = await this.directQuery (
      'SELECT fun_is_user_admin (?) AS result;',
      idUser
    );

    return dbRet[0].result;
  } 

}

module.exports = {
  create: () => new AC,
  Role,
  Resource,
  Permission
};
