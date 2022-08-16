const {DeleteAdminAd} = require('../../../services').api.endpoints;
const AdSvc = require('../../../services').Ads;

module.exports = app => {

	app.delete ( DeleteAdminAd,
		async (req, res) => {
			try {
				const { idAd } = req.body;

				await AdSvc.create().delete({ idAd });

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};