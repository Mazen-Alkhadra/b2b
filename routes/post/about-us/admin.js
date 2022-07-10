const {
	PostAdminAboutusUpdate
} = require('../../../services').api.endpoints;
const AboutSvc = require('../../../services').Aboutus;

module.exports = app => {

	app.post(PostAdminAboutusUpdate,
		async (req, res) => {
			try {
				const { idAboutus, companyInfoEn, whoAreWeEn, viewEn,
					targetEn, otherInfoEn, isActive } = req.body;

				if (!idAboutus) 
					await AboutSvc.create().addNew({
						companyInfoEn, whoAreWeEn, viewEn,
						targetEn, otherInfoEn, isActive
					});
				else 
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