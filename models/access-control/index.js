
const Model = require('../model');

const PERMISSIONS = {
  READ: 'READ',
  EDIT: 'EDIT',
  DELETE: 'DELETE' 
};

const RESOURCES = {
  ADMIN_CONTROL_PANEL: 'ADMIN_CONTROL_PANEL'
};

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
  create: () => new AC
};
