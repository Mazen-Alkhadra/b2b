const PaymentModel = require('../../models').Payment;

class Payment {
  paymentModel = PaymentModel.create();

  async getAllFullInfo({ limit, skip, filters, sorts }) {
    return await this.paymentModel.getAllFullInfo({
      limit, skip, filters, sorts
    });
  }

  async addNew({
    userId, type, amountUsd, comment, status
  }) {
    await this.paymentModel.addNew({
      userId, type, amountUsd, comment, status
    });
  }

  async update({
    idPayment, userId, type, amountUsd, comment, status
  }) {
    await this.paymentModel.update({
      idPayment, userId, type, amountUsd, comment, status
    });
  }

  async delete({ idPayment }) {
    await this.paymentModel.delete({ idPayment });
  }

}


module.exports = {
  create: () => new Payment
};