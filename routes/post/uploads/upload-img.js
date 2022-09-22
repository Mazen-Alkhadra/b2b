const uploadImgsSvc =
  require('../../../services').UploadFiles.UploadImgs.create();
const localFS = require('../../../services').Files.Local.create();
const { uploadImgSetTimeout } = require('../../../middlewares/uploads');
const logger = require('../../../services').logger;
const {
  serverBaseUrl
} = require('../../../config/server').urls;
const { 
  PostAdminUploadImg,
  PostPublicUploadImg,
  GetImgFromLocalFS 
} = require('../../../services').api.endpoints;

module.exports = app => {
  app.post([PostAdminUploadImg, PostPublicUploadImg],
    uploadImgSetTimeout,
    uploadImgsSvc.uploadSingleImgMiddleware(),
    async (req, res) => {

      try {

        const { file } = req;

        if (file && file.size > 0) {
          logger.log(
            logger.levels.SERVER_INFO,
            'Img Uploaded to server',
            __filename,
            PostAdminUploadImg,
            file
          );

          file.originalname =
            `${Date.now()}_${file.originalname}`;

          const imgUrl = serverBaseUrl +
            GetImgFromLocalFS +
            '/' +
            file.originalname;

          await localFS.renameFile(
            file.path,
            file.destination + '/' + file.originalname
          );

          await uploadImgsSvc.addReferenceToDB({
            url: imgUrl
          });

          res.status(200).json({ imgUrl });
        }

      } catch (err) {
        res.processError(err);
      }

    });
};