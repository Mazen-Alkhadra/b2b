const {GetAuthLogout} = require('../../../services').api.endpoints;

module.exports = app => {
  
  app.get(GetAuthLogout, (req, res) => {
    
    req.logout();
    res.status(200).end();
    
  });

};