const { GetUserProducts } = require('../../../services').api.endpoints;
const ProductSvc = require('../../../services').Product;

module.exports = app => {

  app.get(GetUserProducts,
    async (req, res) => {
      try {
        let data = await ProductSvc.create().getAllFullInfo({
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