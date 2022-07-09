const {
	PostAdminIssueReportUpdate
} = require('../../../services').api.endpoints;
const IssueReportSvc = require('../../../services').IssueReport;

module.exports = app => {

	app.post(PostAdminIssueReportUpdate,
		async (req, res) => {
			try {
				const { idIssueReport, content, status } = req.body;

				await IssueReportSvc.create().update({
					idIssueReport, content, status
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};