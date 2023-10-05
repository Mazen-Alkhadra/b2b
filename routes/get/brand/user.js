const { GetUserBrands } = require('../../../services').api.endpoints;
const BrandSvc = require('../../../services').Brand;

module.exports = app => {

  app.get(GetUserBrands,
    async (req, res) => {
      try {
        let data = await BrandSvc.create().getAllFullInfo({
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