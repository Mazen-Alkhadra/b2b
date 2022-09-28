const {
	PostAdminUser,
	PostAdminUpdateUser,
	PostAdminAcceptUsers
} = require('../../../services').api.endpoints;
const UserSvc = require('../../../services').User;

module.exports = app => {

	app.post(PostAdminUser,
		async (req, res) => {
			try {
				const { firstName, lastName, email, mobile, password, companyId,
          birthDate, gender, imgUrl, isBlocked, isActive,
					hasMobileWhatsapp, roleId } = req.body;

				await UserSvc.create().addNew({
          firstName, lastName, email, mobile, password, companyId,
          birthDate, gender, imgUrl, isBlocked, isActive,
					hasMobileWhatsapp, roleId
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
					password, companyId, birthDate, gender, imgUrl, roleId,
					isBlocked, isActive, isAccepted, hasMobileWhatsapp } = req.body;

				await UserSvc.create().update({
          idUser, firstName, lastName, email, mobile, password, companyId,
          birthDate, gender, imgUrl, isBlocked, isActive, isAccepted,
					hasMobileWhatsapp, roleId
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);

	app.post(PostAdminAcceptUsers,
		async (req, res) => {
			try {
				const { usersIds, isAccepted } = req.body;

				await UserSvc.create().accept ({
          usersIds, isAccepted
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};