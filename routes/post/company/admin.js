const {
	PostAdminCompany,
	PostAdminUpdateCompany
} = require('../../../services').api.endpoints;
const CompanySvc = require('../../../services').Company;

module.exports = app => {

	app.post(PostAdminCompany,
		async (req, res) => {
			try {
				const { nameEn, type, address, licenseNumber,
					establishAt, licenseImgUrl } = req.body;

				await CompanySvc.create().addNew({
					nameEn, type, address, licenseNumber, 
					establishAt, licenseImgUrl
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);

	app.post(PostAdminUpdateCompany,
		async (req, res) => {
			try {
				const { idCompany, nameEn, type, address, 
					licenseNumber, establishAt, licenseImgUrl } = req.body;

				await CompanySvc.create().update({
					idCompany, nameEn, type, address,
					licenseNumber, establishAt, licenseImgUrl
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};