let passport = require('./passport');
let UserSvc = require('../user');
let HashSvc = require('../hash');
const NotifySvc = require('../notification');

const { ERR_INVALID_ARGUMENT } = require('../../resources').errors.codes;

const passportInit = passport.initialize();
const passportSession = passport.session();

class Auth {
  userSvc = UserSvc.create();
  userCodeSvc = UserSvc.Codes.create();
  hashSvc = HashSvc.create();

  async signup({
    firstName, lastName, email, mobile, password,
    companyId, birthDate, gender, hasMobileWhatsapp
  }) {
    const hashedPassword = await this.hashSvc.hash(password);
    const isMobileVerified = await this.userCodeSvc.isVerified({
      loginName: mobile, allowFalse: true
    });
    const isEmailVerified = await this.userCodeSvc.isVerified({
      loginName: email, allowFalse: true
    });

    birthDate = birthDate || null;
    
    let {newId} = await this.userSvc.addNew ({
      firstName, lastName, email, mobile,
      companyId, birthDate, gender,
      password: hashedPassword,
      hasMobileWhatsapp, isMobileVerified,
      isEmailVerified 
    });

    NotifySvc.Event.create().handl({
      event: NotifySvc.Event.EVENTS_TYPES.NEW_USER_SIGNUP,
      data: {userId: newId}
    });

    this.userCodeSvc.deleteVerified({loginName: mobile});
    this.userCodeSvc.deleteVerified({loginName: email});
  }

  static getAuthenticateMiddleware(callback) {
    return passport.authenticate('local', (err, user, info) => {
      if (typeof callback !== 'function')
        throw new Error(ERR_INVALID_ARGUMENT);

      callback({ err, user, info });
    });
  }

  static getInitAuthMiddleware() {
    return function (request, response, next) {
      passportInit(
        request,
        response,
        function () { passportSession(request, response, next); }
      );
    }
  }

}

module.exports = {
  create: () => new Auth,
  type: Auth
};

