module.exports = app => {
  require('./logout')(app);
  require('./is-loggedin')(app);
}