const {DeleteAdminUser} = require('../../../services').api.endpoints;
const UserSvc = require('../../../services').User;

module.exports = app => {

	app.delete ( DeleteAdminUser,
		async (req, res) => {
			try {
				const { idUser } = req.body;

				await UserSvc.create().delete({ idUser });

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};