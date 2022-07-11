const { GetAdminPaymentsFull } = require('../../../services').api.endpoints;
const PaymentSvc = require('../../../services').Payment;
const extractFilters = require('../../../middlewares/filters');
const extractSorts = require('../../../middlewares/sorts');
const extractSummaries = require('../../../middlewares/summaries');

module.exports = app => {

  app.get(GetAdminPaymentsFull,
    [extractFilters, extractSorts, extractSummaries],
    async (req, res) => {
      try {
        let data = await PaymentSvc.create().getAllFullInfo({
          limit: req.paginate.limit,
          skip: req.paginate.skip,
          filters: req.filters,
          sorts: req.sorts,
          summaries: req.summaries
        });

        res.status(200).json(data);

      } catch (err) {
        res.internalError = err;
        res.status(500).end();
      }
    }
  );
};