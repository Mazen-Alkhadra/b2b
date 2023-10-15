const { GetUserCares } = require('../../../../services').api.endpoints;
const UserSvc = require('../../../../services').User;

module.exports = app => {

  app.get(GetUserCares,
    async (req, res) => {
      try {
        let data = await UserSvc.Cares.create().get({
          userId: req.query.idUser,
          sorts: req.sorts
        });

        res.status(200).json(data);

      } catch (err) {
        res.internalError = err;
        res.status(500).end();
      }
    }
  );
};