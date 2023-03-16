const PaymentSvc = require('../payment');
const StripeSvc = require('./stripe');

class EPay {
  paymentSvc = PaymentSvc.create();

  async reqPay({paymentId}) {
    let { amountUsd, email } = 
      (await this.paymentSvc.getAllFullInfo({paymentId})).data[0];

    let payInfo = await StripeSvc.create().reqPay({
      amountUsd, 
      receiptEmail: email,
      paymentId
    });

    await this.paymentSvc.update({
      idPayment: paymentId,
      payInfo,
      status: PaymentSvc.STATUS.PENDING
    });
    return payInfo;
  }

  async completePay({
    paymentId, details, signature
  }) {
    
    details = await StripeSvc.create().completePay({signature, details});
    
    if(!paymentId)
      paymentId = details.metadata.paymentId;
      
    await this.paymentSvc.update({
      idPayment: paymentId, 
      status: PaymentSvc.STATUS.COMPLETED, 
      payInfo: JSON.stringify(details),
      completeAt: new Date()
    });
  }
}

module.exports = {
  create: () => new EPay
}