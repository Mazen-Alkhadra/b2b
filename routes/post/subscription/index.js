module.exports = app => {
  require('./packages')(app);
  require('./packages-features')(app);
  require('./features')(app);
  require('./promotions')(app);
  require('./user-subcriptions')(app);
}