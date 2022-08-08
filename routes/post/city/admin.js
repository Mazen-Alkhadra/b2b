const {
	PostAdminCity,
	PostAdminCityUpdate
} = require('../../../services').api.endpoints;
const CitySvc = require('../../../services').City;

module.exports = app => {

	app.post(PostAdminCity,
		async (req, res) => {
			try {
				const { nameEn, nameAr, countryId, imgUrl } = req.body;

				await CitySvc.create().addNew({
					nameEn, nameAr, countryId, imgUrl
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);

	app.post(PostAdminCityUpdate,
		async (req, res) => {
			try {
				const { idCity, nameEn, nameAr, countryId, imgUrl } = req.body;

				await CitySvc.create().update({
					idCity, nameEn, nameAr, countryId,
    			imgUrl
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};