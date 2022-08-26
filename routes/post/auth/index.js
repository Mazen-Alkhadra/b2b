module.exports = app => {
  require('./login')(app);
  require('./signup')(app);
}