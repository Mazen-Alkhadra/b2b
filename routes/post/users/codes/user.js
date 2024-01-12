const {
	PostAuthGenActivateCode,
	PostAuthGenResetPasswordCode,
	PostAuthResetPassword
} = require('../../../../services').api.endpoints;
const UserSvc = require('../../../../services').User;

module.exports = app => {

	app.post(PostAuthGenActivateCode,
		async (req, res) => {
			try {
				let { loginName } = req.body;
				
				await UserSvc.Codes.create().genActivationCode ({ loginName });

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);

	app.post(PostAuthGenResetPasswordCode,
		async (req, res) => {
			try {
				const { loginName } = req.body;

				await UserSvc.Codes.create().genResetPasswordCode({ loginName });

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);

	app.post(PostAuthResetPassword,
		async (req, res) => {
			try {
				
				const { code, loginName, newPassword } = req.body;

				const idUser = (await UserSvc.Codes.create().consume({ 
					loginName, code 
				}))?.idUser;
				
				await UserSvc.create().update({ 
					idUser, password: newPassword
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);

};