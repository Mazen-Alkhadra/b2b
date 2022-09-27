const { GetAdminSettings } = require('../../../services').api.endpoints;
const SettingSvc = require('../../../services').Setting;

module.exports = app => {

  app.get(GetAdminSettings,
    async (req, res) => {
      try {

        let { data } = await SettingSvc.create().getAll({
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