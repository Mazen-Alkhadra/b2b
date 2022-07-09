let path = require('path');

module.exports = app => {  

  require('./auth')(app);
  require('./users')(app);
  require('./company')(app);
  require('./subscription')(app);
  require('./access-control')(app);

  app.get('/*', (req, res) => {
    res.status(200).sendFile(
      path.join(__dirname, '../../public/views/index.html')
    );
  });
};