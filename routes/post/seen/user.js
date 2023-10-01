const {
	PostUserSeen
} = require('../../../services').api.endpoints;
const SeenSvc = require('../../../services').Seen;

module.exports = app => {

	app.post(PostUserSeen,
		async (req, res) => {
			try {
				const { recordId, type } = req.body;

				await SeenSvc.create().addNew({
					recordId, type,
					userId: req.user.idUser
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};