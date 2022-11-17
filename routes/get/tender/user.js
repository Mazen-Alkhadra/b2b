const { 
  GetUserTenders, 
  GetUserTendersB2B 
} = require('../../../services').api.endpoints;
const TenderSvc = require('../../../services').Tender;

module.exports = app => {

  app.get(GetUserTenders,
    async (req, res) => {
      try {
        let data = await TenderSvc.create().get({
          userId: req.user.idUser
        });

        res.status(200).json(data);

      } catch (err) {
        res.internalError = err;
        res.status(500).end();
      }
    }
  );

  app.get(GetUserTendersB2B,
    async (req, res) => {
      try {
        let data = await TenderSvc.create().getB2B({
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