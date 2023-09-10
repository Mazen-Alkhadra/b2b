const BrandModel = require('../../models').Brand;

class Brand {
  brandModel = BrandModel.create();

  async getAllFullInfo({ 
    limit, skip, filters, sorts, onlyApproved 
  }) {
    return await this.brandModel.getAllFullInfo({
      limit, skip, filters, sorts, onlyApproved
    });
  }

  async addNew({
    nameEn, descriptionEn, categoryId, addedByUserId,
    isApproved
  }) {
    return await this.brandModel.addNew({
      nameEn, descriptionEn, categoryId, addedByUserId,
      isApproved
    });
  }

  async update({
    idBrand, nameEn, descriptionEn, categoryId, addedByUserId,
    isApproved
  }) {
    await this.brandModel.update({
      idBrand, nameEn, descriptionEn, categoryId, addedByUserId,
      isApproved
    });
  }

  async delete({ idBrand }) {
    await this.brandModel.delete({ idBrand });
  }

}


module.exports = {
  create: () => new Brand
};