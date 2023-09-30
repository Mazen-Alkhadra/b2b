const {
	PostUserTrash
} = require('../../../services').api.endpoints;
const TrashSvc = require('../../../services').Trash;

module.exports = app => {

	app.post(PostUserTrash,
		async (req, res) => {
			try {
				const { recordId, type } = req.body;

				await TrashSvc.create().addNew({
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