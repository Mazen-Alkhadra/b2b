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
					status, tax, cityId, acceptedAt, excutedAt, 
					deliveryAt, creatByUserId } = req.body;

				await OfferSvc.create().addNew({
					tenderId, quantity, priceUSD, deliveryAt,
    			bIncludeDelivery, deliveryCost, deliveryAddress,
    			status, tax, cityId, acceptedAt, excutedAt, 
					creatByUserId: creatByUserId || req.user.idUser
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
					status, tax, cityId, acceptedAt, excutedAt, 
					deliveryAt, creatByUserId } = req.body;

				await OfferSvc.create().update({
					idOffer, tenderId, quantity, priceUSD, 
    				bIncludeDelivery, deliveryCost, deliveryAddress, 
    				status, tax, cityId, acceptedAt, excutedAt,
						deliveryAt, creatByUserId
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};