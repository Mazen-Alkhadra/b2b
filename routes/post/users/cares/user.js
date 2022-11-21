const {
    PostUserCare,
    PostUserCaresReset
} = require('../../../../services').api.endpoints;
const UserSvc = require('../../../../services').User;

module.exports = app => {

    app.post(PostUserCare,
        async (req, res) => {
            try {
                const { categoryId, brandId, productId } = req.body;

                await UserSvc.Cares.create().add({
                    userId: req.user.idUser,
                    categoryId, brandId, productId
                });

                res.status(200).end();

            } catch (err) {
                res.processError(err);
            }
        }
    );

    app.post(PostUserCaresReset,
        async (req, res) => {
            try {
                const { cares } = req.body;

                await UserSvc.Cares.create().resetUserCares ({
                    userId: req.user.idUser,
                    cares
                });

                res.status(200).end();

            } catch (err) {
                res.processError(err);
            }
        }
    );
};