const { GetAdminOffersFull } = require('../../../services').api.endpoints;
const OfferSvc = require('../../../services').Offer;
const extractFilters = require('../../../middlewares/filters');
const extractSorts = require('../../../middlewares/sorts');

module.exports = app => {

  app.get(GetAdminOffersFull,
    [extractFilters, extractSorts],
    async (req, res) => {
      try {
        let data = await OfferSvc.create().getAllFullInfo({
          limit: req.paginate.limit,
          skip: req.paginate.skip,
          filters: req.filters,
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