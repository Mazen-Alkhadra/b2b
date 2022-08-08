const {
	PostAdminCountry,
	PostAdminCountryUpdate
} = require('../../../services').api.endpoints;
const CountrySvc = require('../../../services').Country;

module.exports = app => {

	app.post(PostAdminCountry,
		async (req, res) => {
			try {
				const { nameEn, nameAr, isoCode, phoneCode, imgUrl } = req.body;

				await CountrySvc.create().addNew({
					nameEn, nameAr, isoCode, phoneCode, imgUrl
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);

	app.post(PostAdminCountryUpdate,
		async (req, res) => {
			try {
				const {  idCountry, nameEn, nameAr, isoCode, phoneCode,
					imgUrl } = req.body;

				await CountrySvc.create().update({
					idCountry, nameEn, nameAr, isoCode, phoneCode,
					imgUrl
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};