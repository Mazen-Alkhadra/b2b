module.exports = app => {
  require('./packages')(app);
  require('./promotions')(app);
}