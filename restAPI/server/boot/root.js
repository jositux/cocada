'use strict';

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());
  server.use(router);

  router.get('/whoami', function(req, res) {
    var app = require('../server');
    var AccessToken = app.models.AccessToken;
    AccessToken.findForRequest(req, {}, function(aux, accesstoken) {
      console.log(aux, accesstoken);
      if (accesstoken == undefined) {
        res.status(401);
        res.send({
          'Error': 'Unauthorized',
          'Message': 'You need to be aaaauthenticated to access this endpoint',
        });
      } else {
        var UserModel = app.models.user;
        UserModel.findById(accesstoken.userId, function(err, user) {
          console.log(user);
          res.status(200);
          res.send();
        });
      }
    });
  });
};
