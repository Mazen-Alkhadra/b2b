const { GetUserOffers } = require('../../../services').api.endpoints;
const OfferSvc = require('../../../services').Offer;

module.exports = app => {

  app.get(GetUserOffers,
    async (req, res) => {
      try {
        let data = await OfferSvc.create().get({
          tenderId: req.query.tenderId,
          creatByUserId: req.query.creatByUserId,
          statusArr: req.query.status ? req.query.status.split(',') : null,
          exceptUserTrash: req.user.idUser,
          reqUserId: req.user.idUser
        });

        res.status(200).json(data);

      } catch (err) {
        res.internalError = err;
        res.status(500).end();
      }
    }
  );
};