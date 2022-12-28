const FirebaseSvc = require('./firebase');

class NotificationMsg {
  async sendNotificationsToUsers({
    usersIds, 
    notifications, //[{type, titleEn, contentEn, titleAr, contentAr, imgUrl}]
  }) {
    let NotificationSvc = require('../index');
    let sendData = [];
    let devices = (await NotificationSvc.NotifyDevice.create()
      .getNotifyUsersDevices({usersIds})).data;
    
    devices.forEach( device => {
      notifications.forEach ( 
        ({titleEn, contentEn, titleAr, contentAr, imgUrl, type}) => {
          sendData.push({
            notification: { 
              title: titleEn || titleAr,
              body: contentEn || contentAr, 
              imageUrl: imgUrl ? encodeURI(imgUrl) : null 
            },
            token: device.token,
            data: {"type": type}
          });
      });
    });
    
    
    NotificationSvc.create().addBatch({usersIds, notifications});
    await FirebaseSvc.create().notify({data: sendData});
    
  }
}

module.exports = {
  create: () => new NotificationMsg
}