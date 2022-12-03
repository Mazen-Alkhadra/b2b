const twilio = require('twilio');
const logger = require('../../logger');
const {name: appName} =  require('../../../config/server').app;

const accountSid = 'AC633da6ec3f06128d9c9e40478e40eb0c'; 
const authToken = 'ca112e454a1e1e4f75394bba6813b2a8'; 
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