let {endpoints} = require('../../services').api;
let {requireLogin} = require('../auth');
let {requireAdmin} = require('../access-control');
let validators = require('../../services').validators;
let validatorMiddleware = require('../validator');
const extractFilters = require('../filters');
const extractSorts = require('../sorts');

module.exports = (app) => {
 let apisMiddlewares = {};
 
 apisMiddlewares[endpoints.PostAuthSignup] = [
  validatorMiddleware(validators.signup)
 ]
 


 app.use('/api/admin/*', requireAdmin(), extractFilters, extractSorts);
 app.use('/api/user/*', requireLogin(), extractFilters, extractSorts);

 let apiEndpoint = null;
 for(apiEndpoint in apisMiddlewares)
  app.use(apiEndpoint, apisMiddlewares[apiEndpoint]);
}