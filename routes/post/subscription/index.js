module.exports = app => {
  require('./packages')(app);
  require('./packages-features')(app);
}