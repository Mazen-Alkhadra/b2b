const { 
  GetAdminReportUsersUsage 
} = require('../../../services').api.endpoints;
const ReportSvc = require('../../../services').Reports;

module.exports = app => {

  app.get(GetAdminReportUsersUsage,
    async (req, res) => {
      try {
        let {data} = await ReportSvc.create().usersUsge();
        res.status(200).json(data);

      } catch (err) {
        res.internalError = err;
        res.status(500).end();
      }
    }
  );
};