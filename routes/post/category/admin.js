const {
	PostAdminCategory,
	PostAdminCategoryUpdate
} = require('../../../services').api.endpoints;
const CategorySvc = require('../../../services').Category;

module.exports = app => {

	app.post(PostAdminCategory,
		async (req, res) => {
			try {
				const { nameEn, descriptionEn } = req.body;

				let data = await CategorySvc.create().addNew({
					nameEn, descriptionEn,
					addedByUserId: req.user.idUser
				});

				res.status(200).json(data);

			} catch (err) {
				res.processError(err);
			}
		}
	);

	app.post(PostAdminCategoryUpdate,
		async (req, res) => {
			try {
				const { idCategory, nameEn, descriptionEn } = req.body;

				await CategorySvc.create().update({
					idCategory, nameEn, descriptionEn
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};