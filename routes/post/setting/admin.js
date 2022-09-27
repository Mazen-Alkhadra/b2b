const {
	PostAdminSettingUpdate
} = require('../../../services').api.endpoints;
const SettingSvc = require('../../../services').Setting;

module.exports = app => {

	app.post(PostAdminSettingUpdate,
		async (req, res) => {
			try {
				const { idSetting, nameEn, value } = req.body;

				await SettingSvc.create().update({
					idSetting, nameEn, value
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};