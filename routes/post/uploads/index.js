module.exports = app => {
  require('./upload-img')(app);
  require('./upload-doc')(app);
};