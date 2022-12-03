const NotificationSvc = require('../../../services/notification');

module.exports = app => {
	app.post(`/api/user/notifications/read`,
		async (req, res) => {
			try {
				const { notificationsIds } = req.body;

				await NotificationSvc.create().setRead({
					notificationsIds
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		});

}