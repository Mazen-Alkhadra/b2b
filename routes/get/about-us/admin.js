const { 
  GetAdminAboutusFull 
} = require('../../../services').api.endpoints;
const AboutSvc = require('../../../services').Aboutus;

module.exports = app => {

  app.get(GetAdminAboutusFull,
    async (req, res) => {
      try {
        let data = await AboutSvc.create().getAllFullInfo({
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