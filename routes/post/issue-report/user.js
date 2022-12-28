const {
	PostUserIssueReport
} = require('../../../services').api.endpoints;
const IssueReportSvc = require('../../../services').IssueReport;

module.exports = app => {

	app.post(PostUserIssueReport,
		async (req, res) => {
			try {
				const { content } = req.body;

				await IssueReportSvc.create().addNew({
          reporterUserId: req.user.idUser,
					content
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};