const {
	DeleteAdminUserSubscribe
} = require('../../../../services').api.endpoints;
const SubscribeSvc = require('../../../../services').Subscription;

module.exports = app => {

	app.delete(DeleteAdminUserSubscribe,
		async (req, res) => {
			try {
				const { idSubscription } = req.body;

				await SubscribeSvc.UserSubscription.create().delete({
					idSubscription
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};