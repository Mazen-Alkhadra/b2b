const { GetAdminStatsFull } = require('../../../services').api.endpoints;
const StatSvc = require('../../../services').Stats;

module.exports = app => {

  app.get(GetAdminStatsFull,
    async (req, res) => {
      try {
        let statSvc = StatSvc.create();
        let data = {};

        data.mostBuyCompany = (await statSvc.getMostBuyCompany()).data;
        data.mostOrderCompany = (await statSvc.getMostOrderCompany()).data;
        data.mostOrderProduct = (await statSvc.getMostOrderProduct()).data;
        data.bestProductPrice = (await statSvc.getBestProductPrice({})).data;

        res.status(200).json(data);

      } catch (err) {
        res.internalError = err;
        res.status(500).end();
      }
    }
  );
};