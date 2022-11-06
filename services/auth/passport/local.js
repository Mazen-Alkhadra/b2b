// Authenticate requests using passport 
const passport = require('passport');
const localStrategy = require('passport-local');
const logger = require('../../logger');
const UserModel = require('../../../models').User;
let HashSvc = require('../../hash');
const {
	ERR_INACTIVE_ACCOUNT,
	ERR_UN_ACCEPTED_ACCOUNT
} = require('../../../resources').errors.codes;

passport.use (
	'local',
	new localStrategy({
		usernameField: 'loginName',
		passwordField: 'password',
	},
		async function (loginName, password, done) {
			let user = null;
			let hashSvc = HashSvc.create();

				try {
					user = await UserModel.create().findUser({loginName});
				} catch (err) {
					logger.log(
						logger.levels.SERVER_ERR,
						err.message,
						__filename,
						'passport strategy',
						err
					);
					return done(null, false, err);
				}
				
				if (!user) {
					return done(null, false, { message: 'Invalid Login Name Or Password' });
				}

				if (!await hashSvc.isOrigin(password, user.password)) {
					return done(null, false, { message: 'Invalid Login Name Or Password' });
				}

				if (!user.isActive) {
					return done(null, false, {
						code: ERR_INACTIVE_ACCOUNT,
						message: 'The account is not activated yet, please\
							active your account by clicking on the activation link sent to your email.'});
				}

				if (!user.isAccepted) {
					return done(null, false, { code: ERR_UN_ACCEPTED_ACCOUNT });
				}

				return done(null, user, { message: 'Success' });

		}
	)
);

module.exports = passport;
