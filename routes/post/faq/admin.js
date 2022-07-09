const {
	PostAdminFaqUpdate
} = require('../../../services').api.endpoints;
const FaqSvc = require('../../../services').Faq;

module.exports = app => {

	app.post(PostAdminFaqUpdate,
		async (req, res) => {
			try {
				const { idFaq, questionEn, answerEn, isActive } = req.body;

				await FaqSvc.create().update({
					idFaq, questionEn, answerEn, isActive
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};