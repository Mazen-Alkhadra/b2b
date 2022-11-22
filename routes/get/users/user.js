const { GetUserProfileInfo } = require('../../../services').api.endpoints;
const UserSvc = require('../../../services').User;

module.exports = app => {

  app.get(GetUserProfileInfo,
    async (req, res) => {
      try {
        let data = await UserSvc.create().getProfileInfo({
          userId: req.user.idUser
        });

        res.status(200).json(data);

      } catch (err) {
        res.internalError = err;
        res.status(500).end();
      }
    }
  );
};