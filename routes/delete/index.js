module.exports = app => {  
  require('./users')(app);
  require('./company')(app);
  require('./subscription')(app);
  require('./access-control')(app);
  require('./faq')(app);
  require('./about-us')(app);
  require('./issue-report')(app);
  require('./category')(app);
  require('./brand')(app);
  require('./product')(app);
  
};