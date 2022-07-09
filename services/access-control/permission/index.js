const {Permission: PermissionModel} = require('../../../models').AccessControl;

class Permission {
  permissionModel = PermissionModel.create();

  async getAllFullInfo({ limit, skip, filters, sorts }) {
    return await this.permissionModel.getAllFullInfo({
      limit, skip, filters, sorts
    });
  }
}


module.exports = {
  create: () => new Permission
};