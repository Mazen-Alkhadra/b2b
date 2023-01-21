const SMSService = require('./twilio');
const {name: appName} =  require('../../config/server').app;

class SMS {
  smsSvc = SMSService.create();

  async sendConfirmCode ({ mobileNumber, code }) {

    let msg = `${code} is your ${appName} verification code`;

    await this.smsSvc.sendMsg({numbers: [mobileNumber], message: msg});
  }

  async sendVerify ({ mobileNumber }) {
    await this.smsSvc.sendVerify({numbers: [mobileNumber]});
  }

  async validateVerify({toNumber, code}) {
    try {
      
      if(await this.smsSvc.validateVerify({toNumber, code}))
        return true;
      return false;
      
    } catch (err) {
      return false;
    }
  }
}

module.exports = {
  create: () => new SMS
}