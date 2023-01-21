const {
	PostUserSubscribe
} = require('../../../../services').api.endpoints;
const SubscribeSvc = require('../../../../services').Subscription;

module.exports = app => {

	app.post(PostUserSubscribe,
		async (req, res) => {
			try {
				const { subscriptionPackageId, promotionCode } = req.body;

				let {newId} = await SubscribeSvc.UserSubscription.create().addNew({
						userId: req.user.idUser, 
        	  subscriptionPackageId,
        	  promotionCode
					});

				res.status(200).json({subscriptionId: newId});

			} catch (err) {
				res.processError(err);
			}
		}
	);
};