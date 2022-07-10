const {
	PostAdminContctInfoUpdate
} = require('../../../services').api.endpoints;
const ContactInfoSvc = require('../../../services').ContactInfo;

module.exports = app => {

	app.post(PostAdminContctInfoUpdate,
		async (req, res) => {
			try {
				const { idContactInfo, address, mobile, phone,
					email, moreInfo, isActive } = req.body;

				if (!idContactInfo)
					await ContactInfoSvc.create().addNew({
						address, mobile, phone, email, moreInfo,
						isActive: true
					});
				else
					await ContactInfoSvc.create().update({
						idContactInfo, address, mobile, phone,
						email, moreInfo, isActive
					});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};