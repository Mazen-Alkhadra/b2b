const {DeleteAdminIssueReport} = require('../../../services').api.endpoints;
const IssueReportSvc = require('../../../services').IssueReport;

module.exports = app => {

	app.delete ( DeleteAdminIssueReport,
		async (req, res) => {
			try {
				const { idIssueReport } = req.body;

				await IssueReportSvc.create().delete({ idIssueReport });

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};