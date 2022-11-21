module.exports = app => {
  require('./admin')(app);
  require('./codes')(app);
  require('./cares')(app);
}