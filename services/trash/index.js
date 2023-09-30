const TrashModel = require('../../models').Trash;

class Trash {
  trashModel = TrashModel.create();

  async get({
    userId, type, limit, skip, filters, sorts
  }) {
    return await this.trashModel.get({
      userId, type, limit, skip, filters, sorts
    });
  }

  async addNew({
    recordId, userId, type
  }) {
    await this.trashModel.addNew({
      recordId, userId, type
    });
  }

  async delete({ id, recordId, userId, type }) {
    await this.trashModel.delete({ id, recordId, userId, type });
  }

}


module.exports = {
  create: () => new Trash
};