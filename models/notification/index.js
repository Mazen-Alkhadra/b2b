const Model = require('../model');
const NotifyDevice = require('./notify-users-devices');
const StringModel = require('../resource').String;

class Notification extends Model {
  static TABLE_NAME = 'notifications';
  static PRIMARY_KEY = 'id_notification'; 

  TYPES = {
    NORMAL: 'NORMAL',
    IMPORTANT: 'IMPORTANT'
  };

  async getUserNotifications({
    userId, type, onlyNotRead, lastNDays,
    limit, skip, language
  }) {

    let userCond = !userId ? 'TRUE' : 
      `user_id = ${this.escapeSql(userId)}`;
    let typeCond = !type ? 'TRUE' : 
      `type = ${this.escapeSql(type)}`;
    let onlyNotReadCond = !onlyNotRead ? 'TRUE' :
      `read_at IS NULL`;
    let lastNDaysCond = !lastNDays ? 'TRUE' :
      `creat_at > DATE_SUB(CURRENT_TIMESTAMP(), INTERVAL ${lastNDays} DAY)`;
    language = this.escapeSql(language); 

    let countQuery = `
      SELECT 
        COUNT(*) allCount
      FROM 
        notifications
      WHERE 
        ${userCond} AND 
        ${typeCond} AND 
        ${onlyNotReadCond} AND
        ${lastNDaysCond};\n`;

    let dataQuery =
      `SELECT
        id_notification notificationId,
        user_id userId,
        type,
        fun_get_string(${language}, title_str_id) title,
        fun_get_string(${language}, content_str_id) content,
        fun_get_img(img_id) imgUrl,
        creat_at creatAt,
        read_at readAt
      FROM
        notifications
      WHERE 
        ${userCond} AND 
        ${typeCond} AND 
        ${onlyNotReadCond} AND
        ${lastNDaysCond}
      ORDER BY 
        creat_at DESC
      `;

      let queryStr = '';
      
      queryStr = `${countQuery + dataQuery}`
      queryStr += `${this.getLimitClause({limit, skip})};`;
      
      let dbRet = await this.directQuery(queryStr);
     
      return {
        allCount: dbRet[0][0].allCount,
        data: dbRet[1]
      };      
  }

  async addNew ({
    userId, type, contentEn, contentAr,
    titleEn, titleAr, imgUrl, creatAt,
    readAt
  }) {
        
    let queryStr = 'CALL prc_add_notification(?, @out_new_id);';
    
    const title_str_id = await StringModel.create().addNewString({
      enStr: titleEn,
      arStr: titleAr
    });
    const content_str_id = await StringModel.create().addNewString({
      enStr: contentEn,
      arStr: contentAr
    });

    let dbRet = await this.directQuery(
      queryStr,
      [userId, type, title_str_id, content_str_id, imgUrl, creatAt, readAt]
    );

    if(!dbRet[0] || !dbRet[0][0])
      return {};
           
    return {newId: dbRet[0][0].newId};
  }


  async addBatch ({
    usersIds, notifications
  }) {
    
    if(!usersIds || !usersIds.length)
      return;

    if(!notifications || !notifications.length)
      return;
      
    let queryStr = '';
    let queryParams = [];

    usersIds.forEach( userId => {
      notifications.forEach (({
        titleEn, contentEn, titleAr, contentAr, imgUrl, type
      }) => {
          queryStr += 
            "SET @title_str_id = fun_add_string('en', ?);" +
            "CALL prc_update_string('ar', ?, @title_str_id);" +
            "SET @content_str_id = fun_add_string('en', ?);" +
            "CALL prc_update_string('ar', ?, @content_str_id);" + 
            "CALL prc_add_notification(?, @title_str_id, @content_str_id, ?, @out_new_id);";
        

          queryParams.push (
            titleEn, titleAr,
            contentEn, contentAr,
            [userId, type],
            [imgUrl, null, null]
          );
      });
    });

    await this.directQuery (
      queryStr,
      ...queryParams
    );
  }

  async update ({
    notificationId, userId, type, contentEn,
    contentAr, titleEn, titleAr, imgUrl, readAt
  }) {
    let queryStr = 'CALL prc_update_notification(?);';

    await StringModel.create().updateString({
      tableName: Notification.TABLE_NAME,
      idColName: Notification.PRIMARY_KEY,
      idColValue: notificationId,
      strColName: 'title_str_id',
      enStr: titleEn,
      arStr: titleAr
    });

    await StringModel.create().updateString({
      tableName: Notification.TABLE_NAME,
      idColName: Notification.PRIMARY_KEY,
      idColValue: notificationId,
      strColName: 'content_str_id',
      enStr: contentEn,
      arStr: contentAr
    });

    await this.directQuery(
      queryStr,
      [notificationId, userId, type, imgUrl, readAt]
    );      
  }

  async setRead({
    notificationsIds
  }) {
    if(!notificationsIds || !notificationsIds.length)
      return;

    let queryStr = '';
    let queryParams = [];

    notificationsIds.forEach(notificationId => {
      queryStr += 'CALL prc_update_notification(?);';
      queryParams.push([
        notificationId, null, null, null, new Date().toISOString()
      ]);
    });

    await this.directQuery(
      queryStr,
      ...queryParams
    );
  }

  async delete ({ notificationId }) {
    await this.directQuery(
      'CALL prc_delete_notification(?);',
      notificationId
    );      
  }

}

module.exports = {
  create: () => new Notification,
  NotifyDevice
};