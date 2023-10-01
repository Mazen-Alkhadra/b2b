const SeenModel = require('../../models').Seen;

class Seen {
  seenModel = SeenModel.create();

  async get({
    userId, type, limit, skip, filters, sorts
  }) {
    return await this.seenModel.get({
      userId, type, limit, skip, filters, sorts
    });
  }

  async addNew({
    recordId, userId, type
  }) {
    await this.seenModel.addNew({
      recordId, userId, type
    });
  }

}


module.exports = {
  create: () => new Seen
};