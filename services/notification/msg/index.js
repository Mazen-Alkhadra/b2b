const FirebaseSvc = require('./firebase');
const {defualtImgUrl} = require('../../../config/server').notify;

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
          imgUrl = imgUrl || defualtImgUrl;
          sendData.push({
            notification: { 
              title: titleEn || titleAr,
              body: contentEn || contentAr, 
              imageUrl: encodeURI(imgUrl) 
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