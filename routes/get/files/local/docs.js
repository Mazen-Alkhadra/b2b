const { getDocFromLocalFSApiPath } = require('../../../../config/server').urls;
const { uploads } = require('../../../../config/server');
const localFS = require('../../../../services').Files.Local.create();

module.exports = app => {

  app.get(`${getDocFromLocalFSApiPath}/:docPath`, async (req, res) => {
    try {
      const { docPath } = req.params;

      res.setHeader(
        'content-type',
        localFS.getFileMimeType(docPath) || 'text/plain'
      );

      let docFileStream = localFS.getFile(
        `${uploads.docs.destination}/${docPath}`
      );

      docFileStream.on('end', function () {
        res.end();
      });

      res.status(200);
      docFileStream.pipe(res);

    } catch (err) {
      res.internalError = err;
      res.status(500).end();
    }

  });

};