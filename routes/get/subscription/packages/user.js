const { GetUserSubscribePackages } = require('../../../../services').api.endpoints;
const SubscribeSvc = require('../../../../services').Subscription;
const extractFilters = require('../../../../middlewares/filters');
const extractSorts = require('../../../../middlewares/sorts');

module.exports = app => {

  app.get(GetUserSubscribePackages,
    [extractFilters, extractSorts],
    async (req, res) => {
      try {
        let data = await SubscribeSvc.Packages.create().getAllFullInfo({
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