const sessionConfig = require('../config/server').session;
const {
	PostPublicInfomCompletePay
} = require('../services').api.endpoints;

//Third party middlewares
let express = require('express');
let expressSession = require('express-session');
let MySqlSessionStore = require('express-mysql-session')(expressSession);
let compression = require('compression')
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let db = require('../database');

// Project middlewares
let paginateMiddleware = require('./paginate');
let authMiddleware = require('./auth');
let logMiddleware = require('./log');
let catchRoutErrMiddleware = require('./catch-rout-error');
let userLangMiddleWare = require('./user-lang');
let apisMiddlewaresAssign = require('./api');

module.exports = (app) => {

  app.use(compression());

  app.use(cookieParser());
  app.use(PostPublicInfomCompletePay, bodyParser.raw({type: "*/*"}));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(expressSession({
    secret: process.env.SESSION_SECRET || sessionConfig.defaultSecretKey,
    store: new MySqlSessionStore({ endConnectionOnClose: true }, db),
    resave: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: sessionConfig.cookieMaxAge
    }
  }));

  app.use(logMiddleware);

  app.use('/assets', express.static(`${__dirname}/../public`));
  
  app.use(paginateMiddleware);
  app.use(authMiddleware.init);
  app.use(catchRoutErrMiddleware);
  app.use(userLangMiddleWare);

  apisMiddlewaresAssign(app);
}