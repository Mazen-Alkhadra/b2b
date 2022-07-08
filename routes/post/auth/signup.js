const { Auth } = require('../../../services');
const {PostAuthSignup} = require('../../../services').api.endpoints;

module.exports = app => {

  app.post(PostAuthSignup,
    async (req, res) => {
      try {
        await (new Auth).signup(req.body);
        res.status(200).json({});

      } catch (err) {
        res.processError(err);
      }
    });

};