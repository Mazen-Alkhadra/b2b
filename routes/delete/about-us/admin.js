const {DeleteAdminAboutus} = require('../../../services').api.endpoints;
const AboutSvc = require('../../../services').Aboutus;

module.exports = app => {

	app.delete ( DeleteAdminAboutus,
		async (req, res) => {
			try {
				const { idAboutus } = req.body;

				await AboutSvc.create().delete({ idAboutus });

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};