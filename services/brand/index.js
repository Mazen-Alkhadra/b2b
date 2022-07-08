const BrandModel = require('../../models').Brand;

class Brand {
  brandModel = BrandModel.create();

  async getAllFullInfo({ limit, skip, filters, sorts }) {
    return await this.brandModel.getAllFullInfo({
      limit, skip, filters, sorts
    });
  }

  async addNew({
    nameEn, descriptionEn, categoryId, addedByUserId
  }) {
    await this.brandModel.addNew({
      nameEn, descriptionEn, categoryId, addedByUserId
    });
  }

  async update({
    idBrand, nameEn, descriptionEn, categoryId, addedByUserId
  }) {
    await this.brandModel.update({
      idBrand, nameEn, descriptionEn, categoryId, addedByUserId
    });
  }

  async delete({ idBrand }) {
    await this.brandModel.delete({ idBrand });
  }

}


module.exports = {
  create: () => new Brand
};