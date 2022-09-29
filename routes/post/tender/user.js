const {
	PostUserTender,
  PostUserTenderUpdate
} = require('../../../services').api.endpoints;
const TenderSvc = require('../../../services').Tender;

module.exports = app => {

	app.post(PostUserTender,
		async (req, res) => {
			try {
				const { name, productId, quantity,
					from, to, deliverBefore, cityId, area, 
					street, buildingNumber, addressLongitude, 
					addressLatitude, moreAddressInfo, supplierLocation } = req.body;

				await TenderSvc.create().addNew({
					name, productId, quantity,
    			from, to, deliverBefore, cityId, area, 
    			street, buildingNumber, addressLongitude, 
    			addressLatitude, moreAddressInfo,
					supplierLocation,
					creatByUserId: req.user.idUser
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);

	app.post(PostUserTenderUpdate,
		async (req, res) => {
			try {
				const { idTender, name, productId, quantity,
					from, to, deliverBefore, cityId, area, 
					street, buildingNumber, addressLongitude, 
					addressLatitude, moreAddressInfo, 
					supplierLocation } = req.body;

				await TenderSvc.create().update({
					idTender, name, productId, quantity,
    			from, to, deliverBefore, cityId, area, 
    			street, buildingNumber, addressLongitude, 
    			addressLatitude, moreAddressInfo,
					supplierLocation
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};