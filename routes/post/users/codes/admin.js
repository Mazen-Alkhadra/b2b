const {
	PostAdminGenResetPasswordCode
} = require('../../../../services').api.endpoints;
const UserSvc = require('../../../../services').User;

module.exports = app => {

  app.post(PostAdminGenResetPasswordCode,
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

};