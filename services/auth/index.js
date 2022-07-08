let passport = require('./passport');
let UserSvc = require('../user');
let HashSvc = require('../hash');
const randomCodeGen = require('../random-codes-generator');
const { ERR_INVALID_ARGUMENT } = require('../../resources').errors.codes;

const passportInit = passport.initialize();
const passportSession = passport.session();

class Auth {
  userSvc = UserSvc.create();
  hashSvc = HashSvc.create();

  async signup({
    firstName, lastName, email, mobile, password,
    companyId, birthDate, gender
  }) {
    const hashedPassword = await this.hashSvc.hash(password);

    await this.userSvc.addNew({
      firstName, lastName, email, mobile,
      companyId, birthDate, gender,
      password: hashedPassword
    });
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

