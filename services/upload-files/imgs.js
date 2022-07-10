const multer = require('multer');
const {imgs: uploadImgConfig} = require('../../config/server').uploads;
const ImgModel = require('../../models/resource').Img;


class UploadImgs {
  uploadSingleImgMiddleware () {
    const uploadImg = multer({ 
      dest: uploadImgConfig.destination,
       limits: {
         fieldSize: uploadImgConfig.limitSizeBytes,
         fileSize: uploadImgConfig.limitSizeBytes
        } 
    });
    return uploadImg.single(uploadImgConfig.fieldName);
  }

  uploadUserProfileImgMiddleware () {
    const uploadImg = multer({ 
      dest: uploadImgConfig.destination,
       limits: {
         fieldSize: uploadImgConfig.profileImgLimitSizeBytes,
         fileSize: uploadImgConfig.profileImgLimitSizeBytes
        } 
    });
    return uploadImg.single(uploadImgConfig.fieldName);
  }

  async addReferenceToDB({url}) {
    await ImgModel.create().addNew({url});
  }
  
}

module.exports = {
  create: () => new UploadImgs
};