const {DeleteAdminOffer} = require('../../../services').api.endpoints;
const OfferSvc = require('../../../services').Offer;

module.exports = app => {

	app.delete ( DeleteAdminOffer,
		async (req, res) => {
			try {
				const { idOffer } = req.body;

				await OfferSvc.create().delete({ idOffer });

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};