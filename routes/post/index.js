module.exports = app => {  
  require('./auth')(app);
  require('./users')(app);
  require('./company')(app);
  require('./subscription')(app);
  require('./access-control')(app);
  require('./about-us')(app);
  require('./faq')(app);
  require('./issue-report')(app);
};