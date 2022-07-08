const { GetAdminFullCompany } = require('../../../services').api.endpoints;
const CompanySvc = require('../../../services').Company;
const extractFilters = require('../../../middlewares/filters');
const extractSorts = require('../../../middlewares/sorts');

module.exports = app => {

  app.get(GetAdminFullCompany,
    [extractFilters, extractSorts],
    async (req, res) => {
      try {
        let data = await CompanySvc.create().getAllFullInfo({
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