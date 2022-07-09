const { 
  GetAdminACRolesFull,
  GetAdminACResourcesFull,
  GetAdminACPermissionsFull,
  GetAdminACRolePermissions
} = require('../../../services').api.endpoints;
const ACSvc = require('../../../services').AccessControl;
const extractFilters = require('../../../middlewares/filters');
const extractSorts = require('../../../middlewares/sorts');

module.exports = app => {

  app.get(GetAdminACRolesFull,
    [extractFilters, extractSorts],
    async (req, res) => {
      try {
        let data = await ACSvc.Role.create().getAllFullInfo({
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

  app.get(GetAdminACResourcesFull,
    [extractFilters, extractSorts],
    async (req, res) => {
      try {
        let data = await ACSvc.Resource.create().getAllFullInfo({
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

  app.get(GetAdminACPermissionsFull,
    [extractFilters, extractSorts],
    async (req, res) => {
      try {
        let data = await ACSvc.Permission.create().getAllFullInfo({
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

  app.get(GetAdminACRolePermissions,
    [extractFilters, extractSorts],
    async (req, res) => {
      try {
        let data = await ACSvc.Role.create().getACPermissions({
          limit: req.paginate.limit,
          skip: req.paginate.skip,
          filters: req.filters,
          sorts: req.sorts,
          groupby: req.query.groupby,
          roleId: req.params.idRole
        });

        res.status(200).json(data);

      } catch (err) {
        res.internalError = err;
        res.status(500).end();
      }
    }
  );
};