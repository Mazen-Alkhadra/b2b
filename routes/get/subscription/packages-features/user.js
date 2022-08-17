const {
  GetUserSubscribePackageFeatures
} = require('../../../../services').api.endpoints;
const SubscribeSvc = require('../../../../services').Subscription;

module.exports = app => {

  app.get(GetUserSubscribePackageFeatures,
    async (req, res) => {
      try {
        let data = await SubscribeSvc.PackagesFeatures.create()
          .getAllFullInfo({
            subscriptionPackageId: req.params.idPackage
          });

        res.status(200).json(data);

      } catch (err) {
        res.internalError = err;
        res.status(500).end();
      }
    }
  );
};