const {
	PostAdminSubscribeFeatureUpdate
} = require('../../../../services').api.endpoints;
const SubscribeSvc = require('../../../../services').Subscription;

module.exports = app => {

	app.post(PostAdminSubscribeFeatureUpdate,
		async (req, res) => {
			try {
				const { idSubscriptionFeature, nameEn, descriptionEn } = req.body;

				await SubscribeSvc.Features.create().update({
					idSubscriptionFeature, nameEn, descriptionEn
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};