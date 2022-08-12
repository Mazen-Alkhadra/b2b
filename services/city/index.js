
const CityModel = require('../../models').City;

class City {

  cityModel = CityModel.create();

  async getAllFullInfo({
    countryId, limit, skip, filters, sorts
  }) {
    return await this.cityModel.getAllFullInfo({
      countryId, limit, skip, filters, sorts
    });
  }

  async addNew({
    nameEn, nameAr, countryId, imgUrl
  }) {
    await this.cityModel.addNew({
      nameEn, nameAr, countryId, imgUrl
    });
  }

  async update({
    idCity, nameEn, nameAr, countryId,
    imgUrl
  }) {
    await this.cityModel.update({
      idCity, nameEn, nameAr, countryId,
      imgUrl
    });
  }

  async delete({ idCity }) {
    await this.cityModel.delete({ idCity });
  }

}

module.exports = {
  create: () => new City
};
