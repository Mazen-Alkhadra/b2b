const { 
  GetAdminReportUsersUsage,
  GetAdminReportCategoriesUsage,
  GetAdminReportBrandsUsage,
  GetAdminReportCompanyTypesUsage
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

  app.get(GetAdminReportCategoriesUsage,
    async (req, res) => {
      try {
        let {data} = await ReportSvc.create().categoriesUsge();
        res.status(200).json(data);

      } catch (err) {
        res.internalError = err;
        res.status(500).end();
      }
    }
  );

  app.get(GetAdminReportBrandsUsage,
    async (req, res) => {
      try {
        let {data} = await ReportSvc.create().brandsUsge();
        res.status(200).json(data);

      } catch (err) {
        res.internalError = err;
        res.status(500).end();
      }
    }
  );

  app.get(GetAdminReportCompanyTypesUsage,
    async (req, res) => {
      try {
        let {data} = await ReportSvc.create().companyTypesUsge();
        res.status(200).json(data);

      } catch (err) {
        res.internalError = err;
        res.status(500).end();
      }
    }
  );

};