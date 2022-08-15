const {
	PostAdminSubscribePromotion,
	PostAdminSubscribePromotionUpdate
} = require('../../../../services').api.endpoints;
const SubscribeSvc = require('../../../../services').Subscription;

module.exports = app => {

	app.post(PostAdminSubscribePromotion,
		async (req, res) => {
			try {
				const { code, descriptionEn, startAt, endAt, useCountLimit,
					discountUsd, discountRatio, isActive } = req.body;

				await SubscribeSvc.Promotions.create().addNew({
					code, descriptionEn, startAt, endAt, useCountLimit,
    			discountUsd, discountRatio, isActive
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);

	app.post(PostAdminSubscribePromotionUpdate,
		async (req, res) => {
			try {
				const { idPromotion, code, descriptionEn, startAt, 
					endAt, useCountLimit, discountUsd, discountRatio,
					isActive } = req.body;

				await SubscribeSvc.Promotions.create().update({
					idPromotion, code, descriptionEn, startAt,
    			endAt, useCountLimit, discountUsd, discountRatio,
					isActive
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};