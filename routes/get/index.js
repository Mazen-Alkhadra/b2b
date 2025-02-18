let path = require('path');

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
  require('./trash')(app);
  require('./seen')(app);
  require('./files')(app);
  require('./tender')(app);
  require('./offer')(app);
  require('./payment')(app);
  require('./stats')(app);
  require('./city')(app);
  require('./country')(app);
  require('./ads')(app);
  require('./reports')(app);
  require('./setting')(app);
  require('./notifications')(app);

  app.get('/', (req, res) => {
    res.status(200).sendFile(
      path.join(__dirname, '../../public/views/soon.html')
    );
  });
  
  app.get('/*', (req, res) => {
    res.status(200).sendFile(
      path.join(__dirname, '../../public/views/index.html')
    );
  });
};