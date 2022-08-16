const AdsModel = require('../../models').Ads;

class Brand {
  adsModel = AdsModel.create();

  async getAllFullInfo({ limit, skip, filters, sorts }) {
    return await this.adsModel.getAllFullInfo({
      limit, skip, filters, sorts
    });
  }

  async addNew({
    imgUrl, url, durationMs, isActive
  }) {
    await this.adsModel.addNew({
      imgUrl, url, durationMs, isActive
    });
  }

  async update({
    idAd, imgUrl, url, durationMs, isActive
  }) {
    await this.adsModel.update({
      idAd, imgUrl, url, durationMs, isActive
    });
  }

  async delete({ idAd }) {
    await this.adsModel.delete({ idAd });
  }

}


module.exports = {
  create: () => new Brand
};