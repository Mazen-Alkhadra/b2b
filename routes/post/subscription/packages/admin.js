const {
	PostAdminSubscribePackage,
	PostAdminSubscribePackageUpdate
} = require('../../../../services').api.endpoints;
const SubscribeSvc = require('../../../../services').Subscription;

module.exports = app => {

	app.post(PostAdminSubscribePackage,
		async (req, res) => {
			try {
				const { nameEn, descriptionEn, priceUsd, imgUrl, 
					expirAt, validitySeconds, color, isDefault,
					isActive } = req.body;

				await SubscribeSvc.Packages.create().addNew({
					nameEn, descriptionEn, priceUsd, imgUrl, 
					expirAt, validitySeconds, color, isDefault,
					isActive
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);

	app.post(PostAdminSubscribePackageUpdate,
		async (req, res) => {
			try {
				const { idSubscriptionPackage, nameEn, descriptionEn,
					priceUsd, imgUrl, expirAt, validitySeconds, 
					color, isDefault, isActive } = req.body;

				await SubscribeSvc.Packages.create().update({
					idSubscriptionPackage, nameEn, descriptionEn, priceUsd, 
					imgUrl, expirAt, validitySeconds, color, isDefault, 
					isActive
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};