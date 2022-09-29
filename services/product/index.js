const ProductModel = require('../../models').Product;

class Product {
  productModel = ProductModel.create();

  async getAllFullInfo({ limit, skip, filters, sorts }) {
    return await this.productModel.getAllFullInfo({
      limit, skip, filters, sorts
    });
  }

  async addNew({
    nameEn, descriptionEn, brandId, addedByUserId,
    imgUrl
  }) {
    await this.productModel.addNew({
      nameEn, descriptionEn, brandId, addedByUserId,
      imgUrl
    });
  }

  async update({
    idProduct, nameEn, descriptionEn, brandId, addedByUserId,
    imgUrl
  }) {
    await this.productModel.update({
      idProduct, nameEn, descriptionEn, brandId, addedByUserId,
      imgUrl
    });
  }

  async delete({ idProduct }) {
    await this.productModel.delete({ idProduct });
  }

}


module.exports = {
  create: () => new Product
};