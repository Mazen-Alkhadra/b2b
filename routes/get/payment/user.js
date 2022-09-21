const { GetUserPayments } = require('../../../services').api.endpoints;
const PaymentSvc = require('../../../services').Payment;

module.exports = app => {

  app.get(GetUserPayments,
    async (req, res) => {
      try {
        let data = await PaymentSvc.create().get({
          userId: req.user.idUser
        });

        res.status(200).json(data);

      } catch (err) {
        res.internalError = err;
        res.status(500).end();
      }
    }
  );
};