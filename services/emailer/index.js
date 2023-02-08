const nodemailer = require("nodemailer");
const {name: appName} =  require('../../config/server').app;
const {defaultEmailServer} = require('../../config/server');
const {serverBaseUrl, resetPasswordPagePath} = 
  require('../../config/server').urls;
const logger = require('../logger');


class Emailer {

  constructor(host, port, userName, password, isSecure) {
    this.userName = userName || defaultEmailServer.userName;

    this.transporter = nodemailer.createTransport({
      host: host || defaultEmailServer.host,
      name: host || defaultEmailServer.host,
      port: port || defaultEmailServer.port,
      secure: isSecure || defaultEmailServer.isSecure,
      auth: {
        user: this.userName,
        pass: password || defaultEmailServer.password
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  async sendMail(to, subject, text, html, attachmentsUrls) {
    try {
      let attachments = [];
      if(attachmentsUrls && attachmentsUrls.length)
        attachmentsUrls.forEach(url => attachments.push({path: url}));

      let info = await this.transporter.sendMail({
        from: this.userName,
        to,
        subject,
        text,
        html,
        attachments
      });

      logger.log(
        logger.levels.SERVER_INFO,
        JSON.stringify(info),
        __filename,
        'sendMail'
      );

      return true;

    } catch(err) {
      
      logger.log(
        logger.levels.SERVER_ERR,
        err.message,
        __filename,
        'sendMail',
        err
      )
      
      return false;
    }
  }

  sendActivationCode ({
    userFirstName, userLastName, userEMail, activationCode
  }) {

    let mailBodyHtml = 
      userFirstName ? `Dear <b>${userFirstName} ${userLastName},</b>` : '' + 
      `<p>Thank you for your registeration in our platform,</p>
      <p>To activate your new account, please enter the follwing code in the activation form:</p>
      <p><b>${activationCode}</b></p>
      <p>Best regards.</p>`;

    this.sendMail(
      userEMail,
      `${appName} Account Activation`,
      null,
      mailBodyHtml
    );

  }

  sendResetPasswordLink (
    userFirstName, userLastName, userEMail, resetCode
  ) {

    const resetUrl = 
      `${serverBaseUrl}${resetPasswordPagePath}/${resetCode}`;

    let mailBodyHtml = 
      `Dear <b>${userFirstName} ${userLastName},</b>
      <p>Please follow the link below in order to reset your new account's password:</p>
      <p><a href="${resetUrl}">${resetUrl}</a></p>
      <p>Best regards.</p>`;

    this.sendMail(
      userEMail,
      `${appName} Reset Password`,
      null,
      mailBodyHtml
    );

  } 
}

module.exports = {
  create: () => new Emailer
};