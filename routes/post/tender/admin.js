const {
	PostAdminTender,
	PostAdminTenderUpdate
} = require('../../../services').api.endpoints;
const TenderSvc = require('../../../services').Tender;

module.exports = app => {

	app.post(PostAdminTender,
		async (req, res) => {
			try {
				const { name, productId, quantity,
					from, to, deliverBefore, cityId, area, 
					street, buildingNumber, addressLongitude, 
					addressLatitude, moreAddressInfo, status, 
					closedAt } = req.body;

				await TenderSvc.create().addNew({
					name, productId, quantity,
    			from, to, deliverBefore, cityId, area, 
    			street, buildingNumber, addressLongitude, 
    			addressLatitude, moreAddressInfo, status, 
    			closedAt, 
					creatByUserId: req.user.idUser
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);

	app.post(PostAdminTenderUpdate,
		async (req, res) => {
			try {
				const { idTender, name, productId, quantity,
					from, to, deliverBefore, cityId, area, 
					street, buildingNumber, addressLongitude, 
					addressLatitude, moreAddressInfo, status, 
					closedAt } = req.body;

				await TenderSvc.create().update({
					idTender, name, productId, quantity,
    			from, to, deliverBefore, cityId, area, 
    			street, buildingNumber, addressLongitude, 
    			addressLatitude, moreAddressInfo, status, 
    			closedAt
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};