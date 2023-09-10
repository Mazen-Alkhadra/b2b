const {
	PostPublicIssueReport
} = require('../../../services').api.endpoints;
const IssueReportSvc = require('../../../services').IssueReport;

module.exports = app => {

	app.post(PostPublicIssueReport,
		async (req, res) => {
			try {
				const { content, publicEmail } = req.body;

				await IssueReportSvc.create().addNew ({
					content, publicEmail,
          reporterUserId: req.user ? req.user.idUser : null
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};