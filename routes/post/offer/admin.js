const {
	PostAdminOffer,
	PostAdminOfferUpdate
} = require('../../../services').api.endpoints;
const OfferSvc = require('../../../services').Offer;

module.exports = app => {

	app.post(PostAdminOffer,
		async (req, res) => {
			try {
				const { tenderId, creatByUserId, quantity, priceUSD, 
					bIncludeDelivery, deliveryCost, deliveryAddress,
					status, acceptedAt, excutedAt } = req.body;

				await OfferSvc.create().addNew({
					tenderId, creatByUserId, quantity, priceUSD, 
    			bIncludeDelivery, deliveryCost, deliveryAddress,
    			status, acceptedAt, excutedAt
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);

	app.post(PostAdminOfferUpdate,
		async (req, res) => {
			try {
				const { idOffer, tenderId, creatByUserId, quantity, priceUSD, 
					bIncludeDelivery, deliveryCost, deliveryAddress, 
					status, acceptedAt, excutedAt } = req.body;

				await OfferSvc.create().update({
					idOffer, tenderId, creatByUserId, quantity, priceUSD, 
    			bIncludeDelivery, deliveryCost, deliveryAddress, 
    			status, acceptedAt, excutedAt
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};