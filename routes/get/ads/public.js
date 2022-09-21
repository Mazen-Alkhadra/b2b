const { GetPublicAds } = require('../../../services').api.endpoints;
const AdsSvc = require('../../../services').Ads;

module.exports = app => {

  app.get(GetPublicAds,
    async (req, res) => {
      try {
        let data = await AdsSvc.create().getAllFullInfo({
          limit: req.paginate.limit,
          skip: req.paginate.skip
        });

        res.status(200).json(data);

      } catch (err) {
        res.internalError = err;
        res.status(500).end();
      }
    }
  );
};