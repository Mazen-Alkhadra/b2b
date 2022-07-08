const {
	PostAdminUser,
	PostAdminUpdateUser 
} = require('../../../services').api.endpoints;
const UserSvc = require('../../../services').User;

module.exports = app => {

	app.post(PostAdminUser,
		async (req, res) => {
			try {
				const { firstName, lastName, email, mobile, password, companyId,
          birthDate, gender, imgUrl, isBlocked, isActive } = req.body;

				await UserSvc.create().addNew({
          firstName, lastName, email, mobile, password, companyId,
          birthDate, gender, imgUrl, isBlocked, isActive
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);

	app.post(PostAdminUpdateUser,
		async (req, res) => {
			try {
				const { idUser, firstName, lastName, email, mobile, 
					password, companyId, birthDate, gender, imgUrl, 
					isBlocked, isActive } = req.body;

				await UserSvc.create().update({
          idUser, firstName, lastName, email, mobile, password, companyId,
          birthDate, gender, imgUrl, isBlocked, isActive
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};