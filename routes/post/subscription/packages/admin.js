const {
	PostAdminSubscribePackage,
	PostAdminSubscribePackageUpdate
} = require('../../../../services').api.endpoints;
const SubscribeSvc = require('../../../../services').Subscription;

module.exports = app => {

	app.post(PostAdminSubscribePackage,
		async (req, res) => {
			try {
				const { nameEn, descriptionEn, priceUsdPerMonth, priceUsdPerYear,
					imgUrl, expirAt, validitySeconds, isActive } = req.body;

				await SubscribeSvc.Packages.create().addNew({
					nameEn, descriptionEn, priceUsdPerMonth, priceUsdPerYear,
    			imgUrl, expirAt, validitySeconds, isActive
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
				const { idSubscriptionPackage, name, description, priceUsdPerMonth,
					priceUsdPerYear, imgUrl, expirAt, validitySeconds, isActive } = req.body;

				await SubscribeSvc.Packages.create().update({
					idSubscriptionPackage, name, description, priceUsdPerMonth,
    			priceUsdPerYear, imgUrl, expirAt, validitySeconds, isActive
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};