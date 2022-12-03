const NotificationModel = require('../../models/notification');
const NotifyDevice = require('./notify-users-devices');
const Msging = require('./msg');
const Event = require('./event');

class Notification {
  
  notificationModel = NotificationModel.create();
  TYPES = this.notificationModel.TYPES;

  async getUserNotifications({
    userId, type, onlyNotRead, lastNDays,
    limit, skip, language
  }) {
    return await this.notificationModel.getUserNotifications ({
      userId, type, onlyNotRead, lastNDays,
      limit, skip, language
    });
  }

   async addNew ({
    userId, type, contentEn, contentAr,
    titleEn, titleAr, imgUrl, creatAt,
    readAt
  }) {
  
    return await this.notificationModel.addNew ({
      userId, type, contentEn, contentAr,
      titleEn, titleAr, imgUrl, creatAt,
      readAt
    });

  }

   async addBatch ({
    usersIds, notifications
  }) {
    await this.notificationModel.addBatch({
      usersIds, notifications
    });
  }
  
   async update ({
    notificationId, userId, type, contentEn,
    contentAr, titleEn, titleAr, imgUrl, readAt
  }) {
    await this.notificationModel.update ({
      notificationId, userId, type, contentEn,
      contentAr, titleEn, titleAr, imgUrl, readAt
    });
  }

   async setRead({notificationsIds}) {
    await this.notificationModel.setRead ({notificationsIds});
  }

   async delete ({notificationId}) {
    await this.notificationModel.delete({notificationId});
  }

}



module.exports = {
  create: () => new Notification,
  NotifyDevice,
  Msging,
  Event
};