
const Model = require('../model');

class Stats extends Model {
  async getMostBuyCompany() {
    let dbRet = await this.directQuery (
      'CALL prc_get_most_buy_company();',
    );

    return {
      data: dbRet[0][0]
    }
  }

  async getMostOrderCompany() {
    let dbRet = await this.directQuery (
      'CALL prc_get_most_order_company();',
    );

    return {
      data: dbRet[0][0]
    }
  }

  async getMostOrderProduct() {
    let dbRet = await this.directQuery (
      'CALL prc_get_most_order_product();',
    );

    return {
      data: dbRet[0][0]
    }
  }

  async getBestProductPrice({idProduct}) {
    let dbRet = await this.directQuery (
      'CALL prc_get_best_product_price(?);',
      idProduct
    );

    return {
      data: dbRet[0][0]
    }
  }
}

module.exports = {
  create: () => new Stats
};
