const CategoryModel = require('../../models').Category;

class Category {
  categoryModel = CategoryModel.create();

  async getAllFullInfo({ limit, skip, filters, sorts }) {
    return await this.categoryModel.getAllFullInfo({
      limit, skip, filters, sorts
    });
  }

  async addNew({
    nameEn, descriptionEn, type, addedByUserId
  }) {
    return await this.categoryModel.addNew({
      nameEn, descriptionEn, type, addedByUserId
    });
  }

  async update({
    idCategory, nameEn, descriptionEn, type, addedByUserId
  }) {
    await this.categoryModel.update({
      idCategory, nameEn, descriptionEn, type, addedByUserId
    });
  }

  async delete({ idCategory }) {
    await this.categoryModel.delete({ idCategory });
  }

}


module.exports = {
  create: () => new Category
};