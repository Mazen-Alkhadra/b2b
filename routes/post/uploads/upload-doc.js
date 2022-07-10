const uploadDocsSvc = require('../../../services').UploadFiles.UploadDocs.create();
const localFS = require('../../../services').Files.Local.create();
const { uploadDocSetTimeout } = require('../../../middlewares/uploads');
const logger = require('../../../services').logger;
const {
  serverBaseUrl
} = require('../../../config/server').urls;
const { 
  PostAdminUploadDoc,
  GetDocFromLocalFS
} = require('../../../services').api.endpoints;

module.exports = app => {
  app.post(PostAdminUploadDoc,
    uploadDocSetTimeout,
    uploadDocsSvc.uploadSingleDocMiddleware(),
    async (req, res) => {
      try {
        const { file } = req;

        if (file && file.size > 0) {
          logger.log(
            logger.levels.SERVER_INFO,
            'Documnet Uploaded to server',
            __filename,
            PostAdminUploadDoc,
            file
          );

          file.originalname =
            `${Date.now()}_${file.originalname}`;

          const docUrl = serverBaseUrl +
            GetDocFromLocalFS +
            '/' +
            file.originalname;

          await localFS.renameFile(
            file.path,
            file.destination + '/' + file.originalname
          );

          await uploadDocsSvc.addReferenceToDB({
            url: docUrl
          });

          res.status(200).json({ docUrl });
        }

      } catch (err) {
        res.processError(err);
      }

    });
};