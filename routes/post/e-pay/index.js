module.exports = app => {
  require('./public')(app);
  require('./user')(app);
}