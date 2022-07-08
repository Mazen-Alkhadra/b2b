const {
	DeleteAdminSubscribePromotion
} = require('../../../../services').api.endpoints;
const SubscribeSvc = require('../../../../services').Subscription;

module.exports = app => {

	app.delete(DeleteAdminSubscribePromotion,
		async (req, res) => {
			try {
				const { idPromotion } = req.body;

				await SubscribeSvc.Promotions.create().delete({
					idPromotion
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};