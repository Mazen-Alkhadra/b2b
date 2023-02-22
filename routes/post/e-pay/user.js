const {
	PostUserReqEPay
} = require('../../../services').api.endpoints;
const EPaySvc = require('../../../services').EPay;
const SubscribeSvc = require('../../../services').Subscription;

module.exports = app => {

	app.post(	PostUserReqEPay,
		async (req, res) => {
			try {
				let { paymentId, subscriptionId } = req.body;

				if(!paymentId) {
					paymentId = (await SubscribeSvc.UserSubscription.create()
						.getAllFullInfo({subscriptionId})).data;
					paymentId = paymentId ? paymentId[0].paymentId : null;
				}
				
				if(!paymentId)
					return res.status(400);
					
				let token = await EPaySvc.create().reqPay({ paymentId });

				res.status(200).json({token});

			} catch (err) {
				res.processError(err);
			}
		}
	);
};