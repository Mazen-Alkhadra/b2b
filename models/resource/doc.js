const Model = require('../model');

class Document extends Model {
   
  async addNew({url}) {
    let queryStr = 'SELECT fun_insert_doc(?);';

    await this.directQuery(
      queryStr, url
    );
         
  }

}

module.exports = {
  create: () => new Document
};