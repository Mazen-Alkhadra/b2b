const { GetImgFromLocalFS } = require('../../../../services').api.endpoints;
const { uploads } = require('../../../../config/server');
const localFS = require('../../../../services').Files.Local.create();

module.exports = app => {

  app.get(`${GetImgFromLocalFS}/:imgPath`, async (req, res) => {
    try {
      const { imgPath } = req.params;

      res.setHeader(
        'content-type',
        localFS.getFileMimeType(imgPath) || 'image/jpeg'
      );

      let imgFileStream = localFS.getFile(
        `${uploads.imgs.destination}/${imgPath}`
      );

      imgFileStream.on('end', function () {
        res.end();
      });

      res.status(200);
      imgFileStream.pipe(res);

    } catch (err) {
      res.internalError = err;
      res.status(500).end();
    }

  });

};