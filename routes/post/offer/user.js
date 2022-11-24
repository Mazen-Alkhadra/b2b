const {
	PostUserOffer
} = require('../../../services').api.endpoints;
const OfferSvc = require('../../../services').Offer;

module.exports = app => {

	app.post(PostUserOffer,
		async (req, res) => {
			try {
				const { tenderId, quantity, priceUSD, 
					bIncludeDelivery, deliveryCost, 
          deliveryAddress, tax } = req.body;

				await OfferSvc.create().addNew({
					tenderId, quantity, priceUSD, 
					bIncludeDelivery, deliveryCost, 
          deliveryAddress, tax,
					creatByUserId: req.user.idUser
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};