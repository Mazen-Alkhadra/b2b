const ACModel = require('../../models').AccessControl;

class AC {
  acModel = ACModel.create();

  async isUserAdmin({idUser}) {
    return await this.acModel.isUserAdmin({ idUser });
  }
}


module.exports = {
  create: () => new AC
};