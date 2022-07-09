const {
	PostAdminUserSubscribe,
	PostAdminUserSubscribeUpdate
} = require('../../../../services').api.endpoints;
const SubscribeSvc = require('../../../../services').Subscription;

module.exports = app => {

	app.post(PostAdminUserSubscribe,
		async (req, res) => {
			try {
				const { userId, subscriptionPackageId, paymentId, promotionId,
					promotionCode, expirAt, actualCostUsd, isActive } = req.body;

				await SubscribeSvc.UserSubscription.create().addNew({
					userId, subscriptionPackageId, paymentId, promotionId,
    			promotionCode, expirAt, actualCostUsd, isActive
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
					paymentId, promotionId, promotionCode, expirAt, 
					actualCostUsd, isActive } = req.body;

				await SubscribeSvc.UserSubscription.create().update({
					idSubscription, userId, subscriptionPackageId, paymentId,
    			promotionId, promotionCode, expirAt, actualCostUsd, isActive
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};