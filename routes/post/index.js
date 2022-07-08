module.exports = app => {  
  require('./auth')(app);
  require('./users')(app);
  require('./company')(app);
  require('./subscription')(app);
};