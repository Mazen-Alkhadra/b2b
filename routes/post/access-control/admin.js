const {
	POSTAdminACRole,
	POSTAdminACRoleUpdate,
	PostResetACResetRolePermissions
} = require('../../../services').api.endpoints;
const ACSvc = require('../../../services').AccessControl;

module.exports = app => {

	app.post(POSTAdminACRole,
		async (req, res) => {
			try {
				const { idRole, name } = req.body;

				await ACSvc.Role.create().addNew({
					idRole, name
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);

	app.post(POSTAdminACRoleUpdate,
		async (req, res) => {
			try {
				const { idRole, name } = req.body;

				await ACSvc.Role.create().update({
					idRole, name
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);

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