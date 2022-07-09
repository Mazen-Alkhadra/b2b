const {
	PostAdminAboutus,
	PostAdminAboutusUpdate
} = require('../../../services').api.endpoints;
const AboutSvc = require('../../../services').Aboutus;

module.exports = app => {

	app.post(PostAdminAboutus,
		async (req, res) => {
			try {
				const { companyInfoEn, whoAreWeEn, viewEn,
					targetEn, otherInfoEn, isActive } = req.body;

				await AboutSvc.create().addNew({
					companyInfoEn, whoAreWeEn, viewEn,
    			targetEn, otherInfoEn, isActive
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);

	app.post(PostAdminAboutusUpdate,
		async (req, res) => {
			try {
				const { idAboutus, companyInfoEn, whoAreWeEn, viewEn,
					targetEn, otherInfoEn, isActive } = req.body;

				await AboutSvc.create().update({
					idAboutus, companyInfoEn, whoAreWeEn, viewEn,
    			targetEn, otherInfoEn, isActive
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};