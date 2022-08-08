
const CountryModel = require('../../models').Country;

class Country {

  countryModel = CountryModel.create();

  async getAllFullInfo({
    limit, skip, filters, sorts
  }) {
    return await this.countryModel.getAllFullInfo({
      limit, skip, filters, sorts
    });
  }

  async addNew({
    nameEn, nameAr, isoCode, phoneCode, imgUrl
  }) {
    await this.countryModel.addNew({
      nameEn, nameAr, isoCode, phoneCode, imgUrl
    });
  }

  async update({
    idCountry, nameEn, nameAr, isoCode, phoneCode,
    imgUrl
  }) {
    await this.countryModel.update({
      idCountry, nameEn, nameAr, isoCode, phoneCode,
      imgUrl
    });
  }

  async delete({ idCountry }) {
    await this.countryModel.delete({ idCountry });
  }

}

module.exports = {
  create: () => new Country
};
