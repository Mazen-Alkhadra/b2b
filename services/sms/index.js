const SMSService = require('./twilio');
const {name: appName} =  require('../../config/server').app;

class SMS {
  smsSvc = SMSService.create();

  async sendConfirmCode ({ mobileNumber, code }) {

    let msg = `${code} is your ${appName} verification code`;

    await this.smsSvc.sendMsg({numbers: [mobileNumber], message: msg});
  }


}

module.exports = {
  create: () => new SMS
}