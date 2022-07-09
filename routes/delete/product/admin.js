const {DeleteAdminProduct} = require('../../../services').api.endpoints;
const ProductSvc = require('../../../services').Product;

module.exports = app => {

	app.delete ( DeleteAdminProduct,
		async (req, res) => {
			try {
				const { idProduct } = req.body;

				await ProductSvc.create().delete({ idProduct });

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};