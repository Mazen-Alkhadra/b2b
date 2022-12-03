const { GetPublicActivateAcount } = 
  require('../../../../services').api.endpoints;
const UserSvc = require('../../../../services').User;

module.exports = app => {

  app.get(GetPublicActivateAcount,
    async (req, res) => {
      try {
        
        await UserSvc.Codes.create().consume ({
          loginName: req.params.loginName,
          code: req.params.code
        });
        
        res.status(200).end();

      } catch (err) {
        res.processError(err);
      }
    }
  );
};