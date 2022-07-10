const { GetAdminUsersCaresFull } = require('../../../../services').api.endpoints;
const UserSvc = require('../../../../services').User;
const extractFilters = require('../../../../middlewares/filters');
const extractSorts = require('../../../../middlewares/sorts');

module.exports = app => {

  app.get(GetAdminUsersCaresFull,
    [extractFilters, extractSorts],
    async (req, res) => {
      try {
        let data = await UserSvc.Cares.create().getAllFullInfo({
          limit: req.paginate.limit,
          skip: req.paginate.skip,
          filters: req.filters,
          sorts: req.sorts,
          idUser: req.query.idUser
        });

        res.status(200).json(data);

      } catch (err) {
        res.internalError = err;
        res.status(500).end();
      }
    }
  );
};