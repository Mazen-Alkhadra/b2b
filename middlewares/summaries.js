module.exports = function (req, res, next) {
  if(req.method !== 'GET') {
    next();
    return;
  }

  const {totalSummary} = req.query;
  
  req.summaries = [];

  if (totalSummary)
    try {
      req.summaries = JSON.parse(totalSummary);
    } catch (err) {}
     
  next();
}


/* middleware output 
req.summaries = [{selector: "key", summaryType: 'sum'}]
*/