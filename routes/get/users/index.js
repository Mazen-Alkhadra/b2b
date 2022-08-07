module.exports = app => {
  require('./admin')(app);
  require('./cares')(app);
  require('./codes')(app);
}