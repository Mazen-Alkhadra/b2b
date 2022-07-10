const multer = require('multer');
const {docs: uploadDocConfig} = require('../../config/server').uploads;
const DocModel = require('../../models/resource').Doc;


class UploadDocs {
  uploadSingleDocMiddleware () {
    const uploadDoc = multer({ 
      dest: uploadDocConfig.destination,
       limits: {
         fieldSize: uploadDocConfig.limitSizeBytes,
         fileSize: uploadDocConfig.limitSizeBytes
        } 
    });
    return uploadDoc.single(uploadDocConfig.fieldName);
  }

  async addReferenceToDB({url}) {
    await DocModel.create().addNew({url});
  }
  
}

module.exports = {
  create: () => new UploadDocs
};