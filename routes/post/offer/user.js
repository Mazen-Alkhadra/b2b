const {
	PostUserOffer,
	PostUserAcceptOffer
} = require('../../../services').api.endpoints;
const OfferSvc = require('../../../services').Offer;

module.exports = app => {

	app.post(PostUserOffer,
		async (req, res) => {
			try {
				const { tenderId, quantity, priceUSD, 
					bIncludeDelivery, deliveryCost, 
          deliveryAddress, tax, cityId } = req.body;

				await OfferSvc.create().addNew({
					tenderId, quantity, priceUSD, 
					bIncludeDelivery, deliveryCost, 
          deliveryAddress, tax, cityId,
					creatByUserId: req.user.idUser
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);

	app.post(PostUserAcceptOffer,
		async (req, res) => {
			try {
				const { idOffer } = req.body;

				await OfferSvc.create().acceptOffer({ idOffer });

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};