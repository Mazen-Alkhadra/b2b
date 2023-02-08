const {StrRes, LANGS} = require('../../../resources/strings');

const EVENTS_TYPES = {
  NEW_USER_SIGNUP: 'NEW_USER_SIGNUP', // data: {userId}
  USER_UPDATE_PROFILE: 'USER_UPDATE_PROFILE', // data: {userId}
  NEW_TENDER_CREATED: 'NEW_TENDER_CREATED', // data: {tenderId, tenderName}
  NEW_OFFER_CREATED: 'NEW_OFFER_CREATED' // data: {tenderId}
} 

class Event {

  async handl({event, data}) {
    
    if(!await this.isEventEnabled({event})) 
      return;
    
    let NotifySvc = require('../index');
    const UserSvc = require('../../user');
    const TenderSvc = require('../../tender'); 

    let toUsersIds = [];
    let notification = {
      titleEn: StrRes(`${event}_NOTIFY_TITLE`, LANGS.EN),
      contentEn: StrRes(`${event}_NOTIFY_CONTENT`, LANGS.EN, data),
      imgUrl: data ? data.imgUrl : null,
      type: event
    } 
    
    switch(event) {
      case EVENTS_TYPES.NEW_USER_SIGNUP:
      case EVENTS_TYPES.USER_UPDATE_PROFILE: 
        const userSvc = UserSvc.create();
        toUsersIds = (await userSvc.getAllFullInfo({onlyAdmins: true}))
          .data.map(user => user.idUser);
        let {firstName, lastName} = await userSvc.userModel.findUser({userId: data.userId});
        notification.contentEn = StrRes (
          `${event}_NOTIFY_CONTENT`, 
          LANGS.EN,
          {userFullName: `${firstName} ${lastName}`}
        );
        break; 

      case EVENTS_TYPES.NEW_TENDER_CREATED: 
        toUsersIds = (await UserSvc.create().getAllFullInfo({careTenderId: data.tenderId}))
          .data.map(user => user.idUser);
        break;

      case EVENTS_TYPES.NEW_OFFER_CREATED: 
        toUsersIds = (await TenderSvc.create().get({tenderId: data.tenderId}))
          .data.map(tender => tender.creatByUserId);
        break;  
    }


    NotifySvc.Msging.create().sendNotificationsToUsers({
      usersIds: toUsersIds,
      notifications: [notification]  
    });
  
  }

  async isEventEnabled({event}) {
    return true;
  };
}


module.exports = {
  create: () => new Event,
  EVENTS_TYPES
}