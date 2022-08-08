const {DeleteAdminCity} = require('../../../services').api.endpoints;
const CitySvc = require('../../../services').City;

module.exports = app => {

	app.delete ( DeleteAdminCity,
		async (req, res) => {
			try {
				const { idCity } = req.body;

				await CitySvc.create().delete({ idCity });

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};