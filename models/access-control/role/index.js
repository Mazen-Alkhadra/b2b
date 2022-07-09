
const Model = require('../../model');

class Role extends Model {
  static TABLE_NAME = 'roles';
  static PRIMARY_KEY = 'id_role';

  async getAllFullInfo({
    limit, skip, filters, sorts
  }) {

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        roles;`


    let dataQuery =
      `SELECT
        id_role	idRole,
				name
      FROM
        roles`;

    let queryStr = countQuery + dataQuery;

    queryStr = this.applyFilters(dataQuery, filters) || queryStr;
    queryStr += this.getOrderClause(sorts);
    queryStr += this.getLimitClause({ limit, skip });


    let dbRet = await this.directQuery(queryStr);

    return {
      allCount: dbRet[0][0].allCount,
      data: dbRet[1]
    };

  }

  async getACPermissions({
    limit, skip, filters, sorts, 
    groupby, roleId, resourceId
  }) {

    let roleCond = !roleId ? 'TRUE' : `role_id = ${this.escapeSql(roleId)}`;
    let resourceCond = 
      !resourceId ? 'TRUE' : `resource_id = ${this.escapeSql(resourceId)}`;

    if (groupby)
      groupby = {
        col: 'role_id',
        colAlias: 'roleId',
        groupCountAlias: 'roleGroupCount'
      };

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        roles_resources_permissions
      WHERE 
        ${roleCond} AND 
        ${resourceCond};`


    let dataQuery =
      `SELECT
        role_id	idRole,
				name
      FROM
        roles_resources_permissions
      WHERE 
        ${roleCond} AND 
        ${resourceCond}`;

    let queryStr = countQuery + dataQuery;

    queryStr = this.applyFilters(dataQuery, filters, groupby) || queryStr;
    queryStr += this.getOrderClause(sorts);
    queryStr += this.getLimitClause({ limit, skip });


    let dbRet = await this.directQuery(queryStr);

    return {
      allCount: dbRet[0][0].allCount,
      groupCount: groupby ? dbRet[0][0][groupby.groupCountAlias] : 0,
      data: groupby ? this.group(dbRet[1], groupby.colAlias) : dbRet[1]
    };

  }

  async addNew({
    idRole, name
  }) {

    await this.directQuery(
      'CALL prc_add_role(?);',
      [idRole, name]
    );
  }

  async update({
    idRole, name
  }) {
    await this.directQuery(
      'CALL prc_update_role(?);',
      [idRole, name]
    );
  }

  async delete({ idRole }) {
    await this.directQuery(
      'CALL prc_delete_role(?);',
      idRole
    );
  }

  async resetACPermissions ({ idRole, resources /* [{ id, permissions }] */ }) {
    let queryStr = 'CALL prc_delete_all_role_permissions(?);';
    let queryParams = [idRole];

    resources.forEach(({id, permissions}) => {
      permissions.forEach(permissionId => {
        queryStr += 'CALL prc_add_permission_to_role(?);';
        queryParams.push([idRole, id, permissionId]);
      });
    });
    
    await this.directQuery(
      queryStr,
      ...queryParams
    );
  }
}

module.exports = {
  create: () => new Role
};
