const {
	PostAdminPrivacyPolicyUpdate
} = require('../../../services').api.endpoints;
const PrivacyPolicySvc = require('../../../services').PrivacyPolicy;

module.exports = app => {

	app.post(PostAdminPrivacyPolicyUpdate,
		async (req, res) => {
			try {
				const { idPrivacyPolicy, contentEn, isActive } = req.body;

				if (!idPrivacyPolicy)
					await PrivacyPolicySvc.create().addNew({
						contentEn, isActive: true
					});
				else
					await PrivacyPolicySvc.create().update({
						idPrivacyPolicy, contentEn, isActive
					});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};