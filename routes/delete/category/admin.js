const {DeleteAdminCategory} = require('../../../services').api.endpoints;
const CategorySvc = require('../../../services').Category;

module.exports = app => {

	app.delete ( DeleteAdminCategory,
		async (req, res) => {
			try {
				const { idCategory } = req.body;

				await CategorySvc.create().delete({ idCategory });

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};