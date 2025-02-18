const { GetUserCategories } = require('../../../services').api.endpoints;
const CategorySvc = require('../../../services').Category;

module.exports = app => {

  app.get(GetUserCategories,
    async (req, res) => {
      try {
        let data = await CategorySvc.create().getAllFullInfo({
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