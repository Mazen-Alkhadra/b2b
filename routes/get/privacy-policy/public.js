const { 
  GetPublicPrivacyPolicy 
} = require('../../../services').api.endpoints;
const PrivacyPolicySvc = require('../../../services').PrivacyPolicy;
const extractFilters = require('../../../middlewares/filters');
const extractSorts = require('../../../middlewares/sorts');

module.exports = app => {

  app.get(GetPublicPrivacyPolicy,
    [extractFilters, extractSorts],
    async (req, res) => {
      try {
        let data = await PrivacyPolicySvc.create().getAllFullInfo({
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