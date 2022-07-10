
const {imgs, docs} = require('../../config/server').uploads;

function uploadImgSetTimeout (req, res, next) {
	res.setTimeout(imgs.resTimeoutMS, () => {});
  req.setTimeout(imgs.resTimeoutMS, () => {});

  if(next)
    next();
    
}

function uploadDocSetTimeout (req, res, next) {
	res.setTimeout(docs.resTimeoutMS, () => {});
  req.setTimeout(docs.resTimeoutMS, () => {});

  if(next)
    next();
    
}


module.exports = {
  uploadDocSetTimeout,
  uploadImgSetTimeout
};