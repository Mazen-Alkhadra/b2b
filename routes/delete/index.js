module.exports = app => {  
  require('./users')(app);
  require('./company')(app);
};