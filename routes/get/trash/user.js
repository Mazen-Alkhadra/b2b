const { 
   GetUserTrash
} = require('../../../services').api.endpoints;
const TrashSvc = require('../../../services').Trash;
const extractFilters = require('../../../middlewares/filters');
const extractSorts = require('../../../middlewares/sorts');

module.exports = app => {

  app.get(GetUserTrash,
    [extractFilters, extractSorts],
    async (req, res) => {
      try {
        let data = await TrashSvc.create().get({
          limit: req.paginate.limit,
          skip: req.paginate.skip,
          filters: req.filters,
          sorts: req.sorts,
          userId: req.user.idUser
        });

        res.status(200).json(data);

      } catch (err) {
        res.processError(err);
      }
    }
  );
};