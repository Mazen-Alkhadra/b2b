const {DeleteAdminTender} = require('../../../services').api.endpoints;
const TenderSvc = require('../../../services').Tender;

module.exports = app => {

	app.delete ( DeleteAdminTender,
		async (req, res) => {
			try {
				const { idTender } = req.body;

				await TenderSvc.create().delete({ idTender });

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};