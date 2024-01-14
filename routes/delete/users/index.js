module.exports = app => {
  require('./admin')(app);
  require('./user')(app);
  require('./cares')(app);
}