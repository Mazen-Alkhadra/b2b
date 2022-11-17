const {  GetUserSettings } = require('../../../services').api.endpoints;
const SettingSvc = require('../../../services').Setting;

module.exports = app => {

  app.get(GetUserSettings,
    async (req, res) => {
      try {
        let { data } = await SettingSvc.create().getAll({});

        res.status(200).json(data);

      } catch (err) {
        res.internalError = err;
        res.status(500).end();
      }
    }
  );
};