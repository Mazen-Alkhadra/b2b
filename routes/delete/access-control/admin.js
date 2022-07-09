const {DELETEAdminACRole} = require('../../../services').api.endpoints;
const ACSvc = require('../../../services').AccessControl;

module.exports = app => {

	app.delete ( DELETEAdminACRole,
		async (req, res) => {
			try {
				const { idRole } = req.body;

				await ACSvc.Role.create().delete({ idRole });

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};