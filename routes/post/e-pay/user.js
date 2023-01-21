const {
	PostUserReqEPay
} = require('../../../services').api.endpoints;
const EPaySvc = require('../../../services').EPay;

module.exports = app => {

	app.post(	PostUserReqEPay,
		async (req, res) => {
			try {
				const { paymentId } = req.body;

				 let token = await EPaySvc.create().reqPay({ paymentId });

				res.status(200).json({token});

			} catch (err) {
				res.processError(err);
			}
		}
	);
};