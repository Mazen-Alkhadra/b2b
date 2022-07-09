module.exports = app => {  
  require('./users')(app);
  require('./company')(app);
  require('./subscription')(app);
  require('./access-control')(app);
};