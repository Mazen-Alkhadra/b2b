const PaymentModel = require('../../models').Payment;

class Payment {
  paymentModel = PaymentModel.create();

  async getAllFullInfo({ 
    limit, skip, filters, sorts, summaries,
    paymentId, payInfo
   }) {
    return await this.paymentModel.getAllFullInfo({
      limit, skip, filters, sorts, summaries,
      paymentId, payInfo
    });
  }

  async get ({ userId }) {
    return await this.paymentModel.get ({ userId });
  }

  async addNew({
    userId, type, amountUsd, comment, status
  }) {
    await this.paymentModel.addNew({
      userId, type, amountUsd, comment, status
    });
  }

  async update({
    idPayment, userId, type, amountUsd, comment, status,
    payInfo, completeAt
  }) {
    await this.paymentModel.update({
      idPayment, userId, type, amountUsd, comment, status,
      payInfo, completeAt
    });
  }

  async delete({ idPayment }) {
    await this.paymentModel.delete({ idPayment });
  }

}


module.exports = {
  create: () => new Payment,
  STATUS: PaymentModel.STATUS
};