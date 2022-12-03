const Model = require('../../model');


class NotifyDevice extends Model {
  async getNotifyUsersDevices({ usersIds }) {

    let usersCond = !usersIds ? 'TRUE' : 
      `user_id IN (${this.escapeSql(usersIds) || 0})`;

    let queryStr =
      `SELECT
        id_device deviceId,
        token
      FROM
        notify_devices
      WHERE 
        ${usersCond}`;
      
      let dbRet = await this.directQuery(queryStr);
     
      return { data: dbRet };      
  }

  async addNew ({
    userId, token
  }) {
        
    let queryStr = `CALL prc_add_notify_device(?, @out_new_id);`;

    let dbRet = await this.directQuery (
      queryStr,
      [userId, token]
    );

    if(!dbRet[0] || !dbRet[0][0])
      return {};
           
    return {newId: dbRet[0][0].newId};
  }

  async delete ({ 
    deviceId, userId, token
  }) {
    await this.directQuery (
      'CALL prc_delete_notify_devices(?);',
      [deviceId, userId, token]
    );      
  }

  async reset ({ 
    userId, tokens
  }) {
    let queryStr = 'CALL prc_delete_notify_devices(?);'
    let queryParams = [[null, userId, null]];

    tokens.forEach(token => {
      queryStr += 'CALL prc_add_notify_device(?, @_out);';
      queryParams.push([userId, token]);
    });

    await this.directQuery (
      queryStr,
      ...queryParams
    );      
  }

}

module.exports = {
  create: () => new NotifyDevice
};