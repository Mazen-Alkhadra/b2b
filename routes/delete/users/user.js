const {DeleteUserProfile} = require('../../../services').api.endpoints;
const UserSvc = require('../../../services').User;

module.exports = app => {

	app.delete ( DeleteUserProfile,
		async (req, res) => {
			try {
			
				await UserSvc.create().softDelete({ idUser: req.user.idUser });

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};