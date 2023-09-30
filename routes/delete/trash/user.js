const {DeleteUserTrash} = require('../../../services').api.endpoints;
const TrashSvc = require('../../../services').Trash;

module.exports = app => {

	app.delete (DeleteUserTrash,
		async (req, res) => {
			try {
				const { id } = req.body;

				await TrashSvc.create().delete({ id });

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};