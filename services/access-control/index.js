const ACModel = require('../../models').AccessControl;
const Role = require('./role');
const Resource = require('./resource');
const Permission = require('./permission');

class AC {
  acModel = ACModel.create();

  async isUserAdmin({idUser}) {
    return await this.acModel.isUserAdmin({ idUser });
  }
}


module.exports = {
  create: () => new AC,
  Role,
  Resource,
  Permission
};