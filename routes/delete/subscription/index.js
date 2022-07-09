module.exports = app => {
  require('./packages')(app);
  require('./promotions')(app);
  require('./user-subscription')(app);

}