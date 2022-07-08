const {
	PostAdminSubscribePackageFeaturesReset
} = require('../../../../services').api.endpoints;
const SubscribeSvc = require('../../../../services').Subscription;

module.exports = app => {

	app.post(PostAdminSubscribePackageFeaturesReset,
		async (req, res) => {
			try {
				const { subscriptionPackageId, features } = req.body;

				await SubscribeSvc.PackagesFeatures.create()
					.resetSubscriptionPackgeFeatures({
						subscriptionPackageId, features
					});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};