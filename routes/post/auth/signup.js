const AuthSvc = require('../../../services').Auth;
const {PostAuthSignup} = require('../../../services').api.endpoints;

module.exports = app => {

  app.post(PostAuthSignup,
    async (req, res) => {
      try {
        await AuthSvc.create().signup(req.body);
        res.status(200).json({});

      } catch (err) {
        res.processError(err);
      }
    });

};