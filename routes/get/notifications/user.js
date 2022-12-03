const NotificationSvc = require('../../../services/notification');

module.exports = app => {

  app.get('/api/user/notifications', 
    async (req, res) => {
      try{
        let data = await NotificationSvc.create().getUserNotifications({
          limit: req.paginate.limit,
          skip: req.paginate.skip, 
          userId: req.user.idUser,
          type: req.query.type,
          onlyNotRead: req.query.onlyNotRead,
          lastNDays: req.query.lastNDays
        });

        res.status(200).json(data);
      } catch (err) {
        processError(err);
      }

    }
  );

};