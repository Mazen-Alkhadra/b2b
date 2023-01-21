const {
	PostPublicInfomCompletePay
} = require('../../../services').api.endpoints;
const EPaySvc = require('../../../services').EPay;

module.exports = app => {

	app.post(PostPublicInfomCompletePay,
		async (req, res) => {
			try {
				
				await EPaySvc.create().completePay({
					signature: request.headers['stripe-signature'],
					details: req.body
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};