const { 
  GetPublicCities
} = require('../../../services').api.endpoints;
const CitySvc = require('../../../services').City;

module.exports = app => {

  app.get(GetPublicCities,
    async (req, res) => {
      try {
        let data = await CitySvc.create().getAllFullInfo({
          limit: req.paginate.limit,
          skip: req.paginate.skip,
          filters: req.filters,
          sorts: req.sorts,
          countryId: req.query.countryId
        });

        res.status(200).json(data);

      } catch (err) {
        res.processError(err);
      }
    }
  );
};