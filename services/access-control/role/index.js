const {Role: RoleModel} = require('../../../models').AccessControl;

class Role {
  roleModel = RoleModel.create();

  async getAllFullInfo({ limit, skip, filters, sorts }) {
    return await this.roleModel.getAllFullInfo({
      limit, skip, filters, sorts
    });
  }

  async addNew({
    idRole, name
  }) {
    await this.roleModel.addNew({
      idRole, name
    });
  }

  async update({
    idRole, name
  }) {
    await this.roleModel.update({
      idRole, name
    });
  }

  async delete({ idRole }) {
    await this.roleModel.delete({ idRole });
  }

  async resetACPermissions ({ idRole, resources }) {
    await this.roleModel.resetACPermissions({ idRole, resources });
  }

  async getACPermissions ({ 
    limit, skip, filters, sorts, 
    groupby, roleId, resourceId 
   }) {
    return await this.roleModel.getACPermissions({ 
      limit, skip, filters, sorts, 
      groupby, roleId, resourceId 
    });
  }

}


module.exports = {
  create: () => new Role
};