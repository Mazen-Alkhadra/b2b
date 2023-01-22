const {
	PostPublicInfomCompletePay
} = require('../../../services').api.endpoints;
const EPaySvc = require('../../../services').EPay;
const logger = require('../../../services').logger;

module.exports = app => {

	app.post(PostPublicInfomCompletePay,
		async (req, res) => {

			logger.log(
				logger.levels.SERVER_API_ERR,
				'Inform Complete Pay',
				__filename,
				PostPublicInfomCompletePay,
				JSON.stringify(req.body)
			);

			try {
				await EPaySvc.create().completePay({
					signature: req.headers['stripe-signature'],
					details: req.body
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};