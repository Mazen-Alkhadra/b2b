const {
	PostAdminUser,
	PostAdminUpdateUser,
	PostAdminAcceptUsers
} = require('../../../services').api.endpoints;
const UserSvc = require('../../../services').User;
const codeGenSvc = require('../../../services').randomCodesGenerator;

module.exports = app => {

	app.post(PostAdminUser,
		async (req, res) => {
			try {
				let { firstName, lastName, email, mobile, password, companyId,
          birthDate, gender, imgUrl, isBlocked, isActive,
					hasMobileWhatsapp, roleId, notes } = req.body;

				password = password || codeGenSvc.create().generate();

				await UserSvc.create().addNew({
          firstName, lastName, email, mobile, password, companyId,
          birthDate, gender, imgUrl, isBlocked, isActive,
					hasMobileWhatsapp, roleId, notes
				});

				UserSvc.Codes.create().genResetPasswordCode({
					loginName: email || mobile
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
					isBlocked, isActive, isAccepted, hasMobileWhatsapp, notes,
					score, isAuthorized
				} = req.body;

				await UserSvc.create().update({
          idUser, firstName, lastName, email, mobile, password, companyId,
          birthDate, gender, imgUrl, isBlocked, isActive, isAccepted,
					hasMobileWhatsapp, roleId, notes, score, isAuthorized
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
				const { usersIds, isAccepted, notes } = req.body;

				await UserSvc.create().accept ({
          usersIds, isAccepted, notes
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};