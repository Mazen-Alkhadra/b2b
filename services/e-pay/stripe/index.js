const stripeSDK = require("stripe");
const {ERR_INVALID_ARGUMENT} = require('../../../resources').errors.codes;

class Stripe {
  
  constructor() {
    this.stripe = stripeSDK(process.env["STRIPE_SEC_KEY"]);
  }

  async reqPay({paymentId, amountUsd, receiptEmail}) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amountUsd,
      currency: "usd",
      receipt_email: receiptEmail,
      automatic_payment_methods: {
        enabled: true,
      },
      description: receiptEmail,
      metadata: {paymentId}
    });

    return paymentIntent.client_secret;
  }

  async completePay({signature, details}) {
    let completeEvent = null;
    try {
      completeEvent = this.stripe.webhooks.constructEvent(
        details, 
        signature, 
        process.env["STRIPE_COMPLETE_API_KEY"]);
    } catch (err) {
      throw err;
    } 

    if(!completeEvent.type !== 'payment_intent.succeeded')
      throw {message: ERR_INVALID_ARGUMENT};

    return completeEvent.data.object;
  }
  
}

module.exports = {
  create: () => new Stripe
}