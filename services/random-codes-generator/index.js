const cryptoRandomString = require('crypto-random-string');

CODES_TYPES = {
  ALPHA_NUMERIC: 'alphanumeric',
  NUMERIC: 'numeric'
}

class RandomCodesGenerator {
  generate(
    length = 10, 
    codeType = CODES_TYPES.ALPHA_NUMERIC
  ) {
    return cryptoRandomString({length, type: codeType});
  }
  
}

module.exports = {
  create: () => new RandomCodesGenerator,
  CODES_TYPES
};