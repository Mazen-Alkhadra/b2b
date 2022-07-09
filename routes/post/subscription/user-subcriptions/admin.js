const {
	PostAdminUserSubscribe,
	PostAdminUserSubscribeUpdate
} = require('../../../../services').api.endpoints;
const SubscribeSvc = require('../../../../services').Subscription;

module.exports = app => {

	app.post(PostAdminUserSubscribe,
		async (req, res) => {
			try {
				const { userId, subscriptionPackageId, promotionId,
					promotionCode, expirAt, isActive } = req.body;

				await SubscribeSvc.UserSubscription.create().addNew({
					userId, subscriptionPackageId, promotionId, 
					promotionCode, expirAt, isActive
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);

	app.post(PostAdminUserSubscribeUpdate,
		async (req, res) => {
			try {
				const { idSubscription, userId, subscriptionPackageId,
					promotionId, promotionCode, expirAt, isActive } = req.body;

				await SubscribeSvc.UserSubscription.create().update({
					idSubscription, userId, subscriptionPackageId,
    			promotionId, promotionCode, expirAt, isActive
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};