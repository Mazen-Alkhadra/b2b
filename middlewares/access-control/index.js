let ACSvc = require('../../services').AccessControl
let { requireLogin } = require('../auth');

function requireAdmin() {
  return (req, res, next) => {
    requireLogin()(req, res, async () => {
      let acSvc = ACSvc.create();
      if (await acSvc.isUserAdmin({
        idUser: req.user.idUser
      }))
        next();
      else res.status(403).end();
    })
  }
}



module.exports = {
  requireAdmin
}