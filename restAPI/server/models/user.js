'use strict';

module.exports = function(user) {
  /**
   * Permite recibir de manera genérica los datos del usuario
   * actual (login)
   */
  user.me = function(req, next) {
    var AccessToken = user.app.models.AccessToken;
    AccessToken.findForRequest(req, {}, function(aux, accesstoken) {
      var userModel = user.app.models.user;
      userModel.findById(accesstoken.userId, function(error, user) {
        next(error, user);
      });
    });
  };

  user.remoteMethod(
    'me', {
      description: 'Return current user loged.',
      accepts: {
        arg: 'req', type: 'object',
        http: {source: 'req'},
      },
      returns: {
        arg: 'user',
        type: 'object',
      },
      http: {
        verb: 'get',
      },
    }
  );
};
