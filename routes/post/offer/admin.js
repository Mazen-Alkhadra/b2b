const {
	PostAdminOffer,
	PostAdminOfferUpdate
} = require('../../../services').api.endpoints;
const OfferSvc = require('../../../services').Offer;

module.exports = app => {

	app.post(PostAdminOffer,
		async (req, res) => {
			try {
				const { tenderId, quantity, priceUSD, 
					bIncludeDelivery, deliveryCost, deliveryAddress,
					status, tax, acceptedAt, excutedAt } = req.body;

				await OfferSvc.create().addNew({
				tenderId, quantity, priceUSD, 
    			bIncludeDelivery, deliveryCost, deliveryAddress,
    			status, tax, acceptedAt, excutedAt, 
				creatByUserId: req.user.idUser
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
				const { idOffer, tenderId, quantity, priceUSD, 
					bIncludeDelivery, deliveryCost, deliveryAddress, 
					status, tax, acceptedAt, excutedAt } = req.body;

				await OfferSvc.create().update({
					idOffer, tenderId, quantity, priceUSD, 
    				bIncludeDelivery, deliveryCost, deliveryAddress, 
    				status, tax, acceptedAt, excutedAt
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};