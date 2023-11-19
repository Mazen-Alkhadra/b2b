const {
	PostUserOffer,
	PostUserAcceptOffer,
	PostUserExecuteOffer
} = require('../../../services').api.endpoints;
const OfferSvc = require('../../../services').Offer;
const ACSvc = require('../../../services').AccessControl;

module.exports = app => {

	app.post(PostUserOffer,
		async (req, res) => {
			try {
				const { tenderId, quantity, priceUSD, 
					bIncludeDelivery, deliveryCost, 
          deliveryAddress, tax, cityId, deliveryAt } = req.body;

				await OfferSvc.create().addNew({
					tenderId, quantity, priceUSD, 
					bIncludeDelivery, deliveryCost, 
          deliveryAddress, tax, cityId,
					creatByUserId: req.user.idUser,
					deliveryAt
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

				await ACSvc.OfferAC.create().canEditOfferStatus({
					userId: req.user.idUser,
					offerId: idOffer,
					newStatus: OfferSvc.STATUS.ACCEPTED
				});

				await OfferSvc.create().acceptOffer({ idOffer });

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);

	app.post(PostUserExecuteOffer,
		async (req, res) => {
			try {
				const { idOffer } = req.body;

				await ACSvc.OfferAC.create().canEditOfferStatus({
					userId: req.user.idUser,
					offerId: idOffer,
					newStatus: OfferSvc.STATUS.EXECUTED
				});

				await OfferSvc.create().setOfferExecuted({ idOffer });

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};