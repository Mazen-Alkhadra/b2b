const { DeleteUserCare } = require('../../../../services').api.endpoints;
const UserSvc = require('../../../../services').User;

module.exports = app => {

	app.delete ( DeleteUserCare,
		async (req, res) => {
			try {
				const { idUserCare } = req.body;

				await UserSvc.Cares.create().delete({ idUserCare });

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};