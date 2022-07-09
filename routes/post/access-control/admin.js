const {
	PostResetACResetRolePermissions
} = require('../../../services').api.endpoints;
const ACSvc = require('../../../services').AccessControl;

module.exports = app => {

	app.post(PostResetACResetRolePermissions,
		async (req, res) => {
			try {
				const { idRole, resources } = req.body;

				await ACSvc.Role.create().resetACPermissions({
					idRole, resources
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};