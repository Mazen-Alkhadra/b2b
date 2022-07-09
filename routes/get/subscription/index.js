module.exports = app => {
  require('./packages')(app);
  require('./packages-features')(app);
  require('./features')(app);
  require('./user-subscriptions')(app);
}