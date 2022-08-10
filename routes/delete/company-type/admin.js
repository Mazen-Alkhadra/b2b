const {DeleteAdminCompanyType} = require('../../../services').api.endpoints;
const CompanyTypeSvc = require('../../../services').CompanyType;

module.exports = app => {

	app.delete ( DeleteAdminCompanyType,
		async (req, res) => {
			try {
				const { idCompanyType } = req.body;

				await CompanyTypeSvc.create().delete({ idCompanyType });

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};