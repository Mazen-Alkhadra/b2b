const {Resource: ResourceModel} = require('../../../models').AccessControl;

class Resource {
  resourceModel = ResourceModel.create();

  async getAllFullInfo({ limit, skip, filters, sorts }) {
    return await this.resourceModel.getAllFullInfo({
      limit, skip, filters, sorts
    });
  }
}


module.exports = {
  create: () => new Resource
};