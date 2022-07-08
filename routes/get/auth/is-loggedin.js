const {GetAuthIsLoggedIn} = require('../../../services').api.endpoints;

module.exports = app => {
  
  app.get(GetAuthIsLoggedIn, (req, res) => {
    
    if (req.isAuthenticated())
      res.status(200).json({
        user: {...req.user, password: null}
      });

    else 
      res.status(200).json({});
    
  });

};