const Model = require('../../model');

class OfferAC extends Model {
  async canEditOfferStatus({
    userId, offerId, newStatus,
    allowFalse
  }) {
    
    let dbRet = await this.directQuery (
      'SELECT fun_can_user_change_offer_status (?) AS result;',
      [userId, offerId, newStatus, allowFalse]
    );

    return dbRet[0].result;  
  }
}

module.exports =  {
  create: () => new OfferAC
}