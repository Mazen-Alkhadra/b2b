const {
	PostUserProduct
} = require('../../../services').api.endpoints;
const ProductSvc = require('../../../services').Product;

module.exports = app => {

	app.post(PostUserProduct,
		async (req, res) => {
			try {
				const { nameEn, descriptionEn, brandId, imgUrl } = req.body;

				await ProductSvc.create().addNew({
					nameEn, descriptionEn, brandId, imgUrl,
					addedByUserId: req.user.idUser
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};