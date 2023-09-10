const {
    PostUserUpdateProfile
} = require('../../../services').api.endpoints;
const UserSvc = require('../../../services').User;
const CompanySvc = require('../../../services').Company;
const NotifySvc = require('../../../services/notification');

module.exports = app => {

    app.post(PostUserUpdateProfile,
        async (req, res) => {
            try {
                let {
                    // User Info
                    firstName, lastName, email, mobile, password,
                    birthDate, gender, imgUrl, hasMobileWhatsapp,
                    // Company Info
                    nameEn, companyTypeId, licenseNumber,
                    establishAt, licenseImgUrl, cityId, area, street, buildingNumber,
                    addressLongitude, addressLatitude, moreAddressInfo,
                    licenseExpirAt
                } = req.body;
                
                birthDate = birthDate || null;
                let userId = req.user.idUser;
                let userSvc = UserSvc.create();
                let idCompany = (await userSvc.getProfileInfo({userId})).data.companyId;
                let isAccepted = nameEn || companyTypeId || licenseNumber || 
                    establishAt || licenseImgUrl || cityId || area || street || 
                    buildingNumber || addressLongitude || addressLatitude || 
                    moreAddressInfo || licenseExpirAt ? false : null;

                await userSvc.update({
                    idUser: userId,
                    firstName, lastName, email, mobile, password,
                    birthDate, gender, imgUrl, hasMobileWhatsapp,
                    isAccepted
                });

                await CompanySvc.create().update({
                    idCompany, nameEn, companyTypeId, licenseNumber,
                    establishAt, licenseImgUrl, cityId, area, street, buildingNumber,
                    addressLongitude, addressLatitude, moreAddressInfo,
                    licenseExpirAt
                });

                if(isAccepted === false)
                  NotifySvc.Event.create().handl({
                    event: NotifySvc.Event.EVENTS_TYPES.USER_UPDATE_PROFILE,
                    data: { userId: userId }
                  });

                res.status(200).end();

            } catch (err) {
                res.processError(err);
            }
        }
    );
};