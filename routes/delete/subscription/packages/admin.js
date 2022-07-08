const {
	DeleteAdminSubscribePackage
} = require('../../../../services').api.endpoints;
const SubscribeSvc = require('../../../../services').Subscription;

module.exports = app => {

	app.delete(DeleteAdminSubscribePackage,
		async (req, res) => {
			try {
				const { idSubscriptionPackage } = req.body;

				await SubscribeSvc.Packages.create().delete({
					idSubscriptionPackage
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};