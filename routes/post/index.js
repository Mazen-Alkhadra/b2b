module.exports = app => {  
  require('./auth')(app);
  require('./users')(app);
  require('./company')(app);
  require('./company-type')(app);
  require('./subscription')(app);
  require('./access-control')(app);
  require('./about-us')(app);
  require('./faq')(app);
  require('./issue-report')(app);
  require('./category')(app);
  require('./brand')(app);
  require('./product')(app);
  require('./contact-info')(app);
  require('./privacy-policy')(app);
  require('./terms')(app);
  require('./uploads')(app);
  require('./city')(app);
  require('./country')(app);
  require('./tender')(app);
  require('./offer')(app);
  require('./ads')(app);
  require('./setting')(app);
  require('./notification')(app);

};