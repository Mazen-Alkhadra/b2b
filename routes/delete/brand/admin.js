const {DeleteAdminBrand} = require('../../../services').api.endpoints;
const BrandSvc = require('../../../services').Brand;

module.exports = app => {

	app.delete ( DeleteAdminBrand,
		async (req, res) => {
			try {
				const { idBrand } = req.body;

				await BrandSvc.create().delete({ idBrand });

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};