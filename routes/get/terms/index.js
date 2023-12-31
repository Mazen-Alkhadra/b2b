module.exports = app => {
  require('./admin')(app);
  require('./public')(app);
}