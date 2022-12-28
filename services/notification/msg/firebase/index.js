const logSvc = require('../../../logger');
const { initializeApp } = require('firebase-admin/app');
const { getMessaging } = require('firebase-admin/messaging');
const fbAdmin = require("firebase-admin");
const FCM_SERVER_CRED = require('./fcm-server-cred.json');
const APP = initializeApp({
  credential: fbAdmin.credential.cert(FCM_SERVER_CRED)
});

class Firebase {

  async notify ({
    data /* [{notification: { title, body, imageUrl }, token }] */, 
  }) {

    if(!data || !data.length)
      return;
    console.log(data);
    let res = await getMessaging(APP).sendAll(data);
    
    logSvc.log(
      logSvc.levels.SERVER_INFO,
      `Firebase Notify Result`,
      __filename,
      "Firebase::Notify",
      JSON.stringify(res)
    );

    return res;
  }
  
}

module.exports = {
  create: () => new Firebase
};