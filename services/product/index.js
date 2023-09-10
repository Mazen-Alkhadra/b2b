const ProductModel = require('../../models').Product;

class Product {
  productModel = ProductModel.create();

  async getAllFullInfo({ 
    limit, skip, filters, sorts, onlyApproved
  }) {
    return await this.productModel.getAllFullInfo({
      limit, skip, filters, sorts, onlyApproved
    });
  }

  async addNew({
    nameEn, descriptionEn, brandId, addedByUserId,
    imgUrl, isApproved
  }) {
    await this.productModel.addNew({
      nameEn, descriptionEn, brandId, addedByUserId,
      imgUrl, isApproved
    });
  }

  async update({
    idProduct, nameEn, descriptionEn, brandId, addedByUserId,
    imgUrl, isApproved
  }) {
    await this.productModel.update({
      idProduct, nameEn, descriptionEn, brandId, addedByUserId,
      imgUrl, isApproved
    });
  }

  async delete({ idProduct }) {
    await this.productModel.delete({ idProduct });
  }

}


module.exports = {
  create: () => new Product
};