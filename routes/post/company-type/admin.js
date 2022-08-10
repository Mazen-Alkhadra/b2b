const {
	PostAdminCompanyType,
	PostAdminUpdateCompanyType
} = require('../../../services').api.endpoints;
const CompanyTypeSvc = require('../../../services').CompanyType;

module.exports = app => {

	app.post(PostAdminCompanyType,
		async (req, res) => {
			try {
				const { nameEn, descriptionEn } = req.body;

				await CompanyTypeSvc.create().addNew({
					nameEn, descriptionEn
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);

	app.post(PostAdminUpdateCompanyType,
		async (req, res) => {
			try {
				const { idCompanyType, nameEn, descriptionEn } = req.body;

				await CompanyTypeSvc.create().update({
					idCompanyType, nameEn, descriptionEn
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};