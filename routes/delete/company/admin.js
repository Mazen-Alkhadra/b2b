const {DeleteAdminCompany} = require('../../../services').api.endpoints;
const CompanySvc = require('../../../services').Company;

module.exports = app => {

	app.delete ( DeleteAdminCompany,
		async (req, res) => {
			try {
				const { idCompany } = req.body;

				await CompanySvc.create().delete({ idCompany });

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};