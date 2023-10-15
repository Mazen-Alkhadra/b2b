const { 
  GetUserSubscribes 
} = require('../../../../services').api.endpoints;
const SubscribeSvc = require('../../../../services').Subscription;

module.exports = app => {

  app.get(GetUserSubscribes,
    async (req, res) => {
      try {
        let data = await SubscribeSvc.UserSubscription.create().get ({
          userId: req.user.idUser,
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