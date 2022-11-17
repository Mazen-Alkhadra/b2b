const {
    PostUserUpdateProfile
} = require('../../../services').api.endpoints;
const UserSvc = require('../../../services').User;

module.exports = app => {

    app.post(PostUserUpdateProfile,
        async (req, res) => {
            try {
                const {
                    // User Info
                    firstName, lastName, email, mobile, password,
                    birthDate, gender, imgUrl, hasMobileWhatsapp,
                    // Company Info
                    idCompany, nameEn, companyTypeId, licenseNumber,
                    establishAt, licenseImgUrl, cityId, area, street, buildingNumber,
                    addressLongitude, addressLatitude, moreAddressInfo,
                    licenseExpirAt
                } = req.body;

                await UserSvc.create().update({
                    idUser: req.user.idUser,
                    firstName, lastName, email, mobile, password,
                    birthDate, gender, imgUrl, hasMobileWhatsapp,
                    isAccepted: false
                });

                await CompanySvc.create().update({
                    idCompany, nameEn, companyTypeId, licenseNumber,
                    establishAt, licenseImgUrl, cityId, area, street, buildingNumber,
                    addressLongitude, addressLatitude, moreAddressInfo,
                    licenseExpirAt
                });

                res.status(200).end();

            } catch (err) {
                res.processError(err);
            }
        }
    );
};