const {DeleteAdminCountry} = require('../../../services').api.endpoints;
const CountrySvc = require('../../../services').Country;

module.exports = app => {

	app.delete ( DeleteAdminCountry,
		async (req, res) => {
			try {
				const { idCountry } = req.body;

				await CountrySvc.create().delete({ idCountry });

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};