const {
	PostAdminBrand,
	PostAdminBrandUpdate
} = require('../../../services').api.endpoints;
const BrandSvc = require('../../../services').Brand;

module.exports = app => {

	app.post(PostAdminBrand,
		async (req, res) => {
			try {
				const { nameEn, descriptionEn, categoryId } = req.body;

				await BrandSvc.create().addNew({
					nameEn, descriptionEn, categoryId,
					addedByUserId: req.user.idUser
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);

	app.post(PostAdminBrandUpdate,
		async (req, res) => {
			try {
				const { idBrand, nameEn, descriptionEn, categoryId } = req.body;

				await BrandSvc.create().update({
					idBrand, nameEn, descriptionEn, categoryId
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};