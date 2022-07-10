const {
	PostAdminTermsUpdate
} = require('../../../services').api.endpoints;
const TermSvc = require('../../../services').Terms;

module.exports = app => {

	app.post(PostAdminTermsUpdate,
		async (req, res) => {
			try {
				const { idTerm, contentEn, isActive } = req.body;

				if (!idTerm)
					await TermSvc.create().addNew({
						contentEn, isActive: true
					});
				else
					await TermSvc.create().update({
						idTerm, contentEn, isActive
					});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};