const {
	PostAdminAd,
	PostAdminUpdateAd
} = require('../../../services').api.endpoints;
const AdSvc = require('../../../services').Ads;

module.exports = app => {

	app.post(PostAdminAd,
		async (req, res) => {
			try {
				const { imgUrl, url, durationMs, isActive } = req.body;

				await AdSvc.create().addNew({
					imgUrl, url, durationMs, isActive
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);

	app.post(PostAdminUpdateAd,
		async (req, res) => {
			try {
				const { idAd, imgUrl, url, durationMs, isActive } = req.body;

				await AdSvc.create().update({
					idAd, imgUrl, url, durationMs, isActive
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};