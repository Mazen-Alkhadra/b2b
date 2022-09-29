const {
	PostAdminProduct,
	PostAdminProductUpdate
} = require('../../../services').api.endpoints;
const ProductSvc = require('../../../services').Product;

module.exports = app => {

	app.post(PostAdminProduct,
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

	app.post(PostAdminProductUpdate,
		async (req, res) => {
			try {
				const { idProduct, nameEn, descriptionEn, brandId, imgUrl } = req.body;

				await ProductSvc.create().update({
					idProduct, nameEn, descriptionEn, brandId, imgUrl
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};