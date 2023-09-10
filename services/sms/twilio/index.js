const twilio = require('twilio');
const logger = require('../../logger');
const {name: appName} =  require('../../../config/server').app;

const accountSid = 'AC1f2fdb762f979e4ab8ea6bf7dd86a6c5'; 
const authToken = '2105476ad54eb956f0a89c45aa2028cf'; 
const VERIFY_SVC_ID = 'VA49b66b1d9dbcab86895d24686aa28620'; 
const client = new twilio(accountSid, authToken);

class Twilio {

  async sendMsg({ numbers, message }) {
    try {
      
      numbers = this.fixMobilesNumbers({ numbers });
      
      for(let number of numbers) {
        await client.messages.create({
          body: message,
          from: appName,
          to: number
        });
      }

      logger.log (
        logger.levels.SERVER_API_INFO,
        `Twilio SMS Send Msg Success`,
        __filename,
        'Twilio::sendMsg'
      );

    } catch (err) {
      logger.log(
        logger.levels.SERVER_API_ERR,
        `Twilio SMS Send Msg Failed`,
        __filename,
        'Twilio::sendMsg',
        JSON.stringify(err)
      );
      throw err;
    }

  }

  async sendVerify({ numbers }) {
    try {
      
      numbers = this.fixMobilesNumbers({ numbers });
      
      for(let number of numbers) {
        await client.verify.v2.services(VERIFY_SVC_ID).verifications.create({
          to: number,
          channel: 'sms',
          customFriendlyName: "B2B-OTP-V"
        });
      }

      logger.log (
        logger.levels.SERVER_API_INFO,
        `Twilio SMS Send Verify Success`,
        __filename,
        'Twilio::sendVerify'
      );

    } catch (err) {
      logger.log(
        logger.levels.SERVER_API_ERR,
        `Twilio SMS Send Verify Failed`,
        __filename,
        'Twilio::sendVerify',
        err
      );
      throw err;
    }

  }

  async validateVerify({toNumber, code}) {
    return (await client.verify.v2.services(VERIFY_SVC_ID)
      .verificationChecks
      .create({to: toNumber, code})).valid;
  }

  fixMobilesNumbers({ numbers }) {
    if (!Array.isArray(numbers) || !numbers.length)
      return [];

    return numbers;
  }

  fixMobileNumber({ number }) {
    return number;
  }
  
}

module.exports = {
  create: () => new Twilio
}