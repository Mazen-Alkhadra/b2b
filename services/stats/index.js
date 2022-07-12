
const StatModel = require('../../models').Stats;

class Stats {

  statsModel = StatModel.create();

  async getMostBuyCompany() {
    return await this.statsModel.getMostBuyCompany();
  }

  async getMostOrderCompany() {
    return await this.statsModel.getMostOrderCompany();
  }

  async getMostOrderProduct() {
    return await this.statsModel.getMostOrderProduct();
  }

  async getBestProductPrice({idProduct}) {
    return await this.statsModel.getBestProductPrice({idProduct});
  }
}

module.exports = {
  create: () => new Stats
};
