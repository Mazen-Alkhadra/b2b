const { 
  GetAdminCountries
} = require('../../../services').api.endpoints;
const CountrySvc = require('../../../services').Country;

module.exports = app => {

  app.get(GetAdminCountries,
    async (req, res) => {
      try {
        let data = await CountrySvc.create().getAllFullInfo({
          limit: req.paginate.limit,
          skip: req.paginate.skip,
          filters: req.filters,
          sorts: req.sorts
        });

        res.status(200).json(data);

      } catch (err) {
        res.processError(err);
      }
    }
  );
};