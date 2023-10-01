const { 
   GetUserSeen
} = require('../../../services').api.endpoints;
const SeenSvc = require('../../../services').Seen;
const extractFilters = require('../../../middlewares/filters');
const extractSorts = require('../../../middlewares/sorts');

module.exports = app => {

  app.get(GetUserSeen,
    [extractFilters, extractSorts],
    async (req, res) => {
      try {
        let data = await SeenSvc.create().get({
          limit: req.paginate.limit,
          skip: req.paginate.skip,
          filters: req.filters,
          sorts: req.sorts,
          userId: req.user.idUser,
          type: req.query.type
        });

        res.status(200).json(data);

      } catch (err) {
        res.processError(err);
      }
    }
  );
};