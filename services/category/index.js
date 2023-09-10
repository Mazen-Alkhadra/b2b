const CategoryModel = require('../../models').Category;

class Category {
  categoryModel = CategoryModel.create();

  async getAllFullInfo({ 
    limit, skip, filters, sorts, onlyApproved
  }) {
    return await this.categoryModel.getAllFullInfo({
      limit, skip, filters, sorts, onlyApproved
    });
  }

  async addNew({
    nameEn, descriptionEn, type, addedByUserId,
    isApproved
  }) {
    return await this.categoryModel.addNew({
      nameEn, descriptionEn, type, addedByUserId,
      isApproved
    });
  }

  async update({
    idCategory, nameEn, descriptionEn, type, addedByUserId,
    isApproved
  }) {
    await this.categoryModel.update({
      idCategory, nameEn, descriptionEn, type, addedByUserId,
      isApproved
    });
  }

  async delete({ idCategory }) {
    await this.categoryModel.delete({ idCategory });
  }

}


module.exports = {
  create: () => new Category
};