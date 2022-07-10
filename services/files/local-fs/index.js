const fs = require('fs');
const Mime = require('mime');

class LocalFS {

  static cachOfSizes = {};

  renameFile(oldFilePath, newFilePath) {
    return new Promise((resolve, reject) => {
      fs.rename(oldFilePath, newFilePath, (err) => {
        if (err)
        reject(err);
      else
        resolve(newFilePath);
      });
    });
  }

  moveFile(filepath, destPath) {

    return new Promise((resolve, reject) => {
      fs.copyFile(filepath, destPath, (err) => {
        if (err)
          reject(err);
        else
          resolve(destPath);
      });

      fs.unlink(filepath);
    });

  }

  getFile(filePath, offset, size) {

    return fs.createReadStream(filePath, {
      start: offset || 0,
      end: (offset || 0) + (size || Infinity)
    });
  }

  getFileSize(filePath) {

    const sizeInCach = LocalFS.cachOfSizes[filePath];

    return new Promise((resolve, reject) => {

      if (sizeInCach) {
        resolve(sizeInCach);
        return;
      }

      fs.stat(filePath, (err, stats) => {
        if (err) {
          reject(err);
          return;
        }

        LocalFS.cachOfSizes[filePath] = stats.size;
        resolve(stats.size);

      });

    });

  }

  getFileMimeType(filePath) {
    return Mime.getType(filePath);
  }

  createDirectory(fullDirPath) {
    return new Promise((resolve, reject) => {
      fs.exists(fullDirPath, (isExists) => {
        if(isExists) {
          resolve(fullDirPath);
          return;
        }

        fs.mkdir(fullDirPath, { recursive: true }, (err, path) => {
          if(err) {
            reject(err);
            return;
          }
          resolve(path);
        });
      });     
    });
  }

  writeFile(path, data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, data, (err) => {
        if(err)
          reject(err);
        else 
          resolve();
      });
    });
  }

  getFileInfoFromPath(path) {
    let delimiterIndex = path.lastIndexOf('/');

    if(delimiterIndex < 0)
      delimiterIndex = path.lastIndexOf('\\');

    let name = path.substring( delimiterIndex + 1, path.lastIndexOf('.'));
    let extension = path.substring(path.lastIndexOf('.') + 1);
    let fullName = path.substring( delimiterIndex + 1);

    return {name, extension, fullName};
  }

  getFileSystemUrl() {
    return '';
  }
  
  deleteFile(filePath) {
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, err => {
        if(err)
          reject(err);
        else
          resolve();
      })
    });    
  }

}

module.exports = {
  create: () => new LocalFS
};