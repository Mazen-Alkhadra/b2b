const {
	PostUserCategory
} = require('../../../services').api.endpoints;
const CategorySvc = require('../../../services').Category;

module.exports = app => {

	app.post(PostUserCategory,
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
};