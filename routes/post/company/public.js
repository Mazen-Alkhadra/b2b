const {
  PostPublicCompany
} = require('../../../services').api.endpoints;
const CompanySvc = require('../../../services').Company;

module.exports = app => {

  app.post(PostPublicCompany,
    async (req, res) => {
      try {
        const { nameEn, companyTypeId, licenseNumber, establishAt,
          licenseImgUrl, cityId, area, street, buildingNumber,
          addressLongitude, addressLatitude, moreAddressInfo,
          licenseExpirAt } = req.body;

        await CompanySvc.create().addNew({
          nameEn, companyTypeId, licenseNumber, establishAt,
          licenseImgUrl, cityId, area, street, buildingNumber,
          addressLongitude, addressLatitude, moreAddressInfo,
          licenseExpirAt
        });

        res.status(200).end();

      } catch (err) {
        res.processError(err);
      }
    }
  );
}