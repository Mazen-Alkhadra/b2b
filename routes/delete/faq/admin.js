const {DeleteAdminFaq} = require('../../../services').api.endpoints;
const FaqSvc = require('../../../services').Faq;

module.exports = app => {

	app.delete ( DeleteAdminFaq,
		async (req, res) => {
			try {
				const { idFaq } = req.body;

				await FaqSvc.create().delete({ idFaq });

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};