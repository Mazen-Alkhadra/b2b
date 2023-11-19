const { 
  GetUserTenders, 
  GetUserTendersB2B ,
  GetUserTenderContacts
} = require('../../../services').api.endpoints;
const TenderSvc = require('../../../services').Tender;

module.exports = app => {

  app.get(GetUserTenders,
    async (req, res) => {
      try {
        
        const { onlyCreated, onlyUnCompleted, status } = req.query;
        const { idUser } = req.user;

        let data = await TenderSvc.create().get({
          onlyCreatByUserId: parseInt(onlyCreated) ? idUser : null,
          onlyCareByUserId: parseInt(onlyCreated) ? null : idUser,
          onlyUnCompleted: onlyUnCompleted != null ? parseInt(onlyUnCompleted) : true,
          exceptUserTrash: req.user.idUser,
          reqUserId: req.user.idUser,
          limit: req.paginate.limit,
          skip: req.paginate.skip,
          filters: req.filters,
          sorts: req.sorts,
          status
        });

        res.status(200).json(data);

      } catch (err) {
        res.internalError = err;
        res.status(500).end();
      }
    }
  );

  app.get(GetUserTendersB2B,
    async (req, res) => {
      try {
        let data = await TenderSvc.create().getB2B({
          userId: req.user.idUser,
          isPending: req.query.isPending,
          limit: req.paginate.limit,
          skip: req.paginate.skip,
          sorts: req.sorts
        });

        res.status(200).json(data);

      } catch (err) {
        res.internalError = err;
        res.status(500).end();
      }
    }
  );

  app.get(GetUserTenderContacts,
    async (req, res) => {
      try {
        let data = await TenderSvc.create().getContactInfo({
          userId: req.user.idUser,
          offerId: req.query.offerId,
          tenderId: req.query.tenderId
        });

        res.status(200).json(data);

      } catch (err) {
        res.processError(err);
      }
    }
  );
};