module.exports = function(app) {
  var Ds = app.dataSources.db;
  var User = app.models.User;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  Ds.autoupdate(['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role'], function(err) {
    if (err) throw err;
    console.log('\nAutoupdated table `User`, `AccessToken`, `ACL`, `RoleMapping`, `Role`.');

    /** Crear usuarios de prueba si no existen **/
    var datetime = new Date().toISOString().substring(0, 19).replace('T', ' ');

    User.find(
      {where: {and: [{username: 'admin'}]}, limit: 1},
      function(err, records) {
        if (!records.length) {
          User.create({
            username: 'admin',
            email: 'admin@localhost',
            password: 'admin',
            created: datetime,
            lastUpdated: datetime,
          },
          function(err, userInstance) {
            console.log("Creado usuario 'admin' con contraseña 'admin'.");
            console.log(userInstance);

            Role.find(
              {where: {and: [{name: 'admin'}]}, limit: 1},
              function(err, records) {
                if (!records.length) {
                  Role.create({
                    name: 'admin',
                  }, function(err, roleInstance) {
                    console.log("Creado el rol 'admin'");
                    console.log(roleInstance);
                    if (err) console.log(err);
                    // Asigno el Rol
                    roleInstance.principals.create({
                      principalType: RoleMapping.USER,
                      principalId: userInstance.id,
                    }, function(err, principal) {
                      console.log(err);
                    });
                  });
                }
              });
          });
        }
      });

    User.find(
        {where: {and: [{username: 'design'}]}, limit: 1},
        function(err, records) {
          if (!records.length) {
            User.create({
              username: 'design',
              email: 'desgin@localhost',
              password: 'design',
              created: datetime,
              lastUpdated: datetime,
            },
            function(err, userInstance) {
              console.log("Creado usuario 'design' con contraseña 'design'.");
              console.log(userInstance);

              Role.find(
                {where: {and: [{name: 'design'}]}, limit: 1},
                function(err, records) {
                  if (!records.length) {
                    Role.create({
                      name: 'admin',
                    }, function(err, roleInstance) {
                      console.log("Creado el rol 'design'");
                      console.log(roleInstance);
                      if (err) console.log(err);
                      // Asigno el Rol
                      roleInstance.principals.create({
                        principalType: RoleMapping.USER,
                        principalId: userInstance.id,
                      }, function(err, principal) {
                        console.log(err);
                      });
                    });
                  }
                });
            });
          }
        });

    User.find(
          {where: {and: [{username: 'client'}]}, limit: 1},
          function(err, records) {
            if (!records.length) {
              User.create({
                username: 'client',
                email: 'client@localhost',
                password: 'client',
                created: datetime,
                lastUpdated: datetime,
              },
              function(err, userInstance) {
                console.log("Creado usuario 'client' con contraseña 'client'.");
                console.log(userInstance);

                Role.find(
                  {where: {and: [{name: 'client'}]}, limit: 1},
                  function(err, records) {
                    if (!records.length) {
                      Role.create({
                        name: 'client',
                      }, function(err, roleInstance) {
                        console.log("Creado el rol 'client'");
                        console.log(roleInstance);
                        if (err) console.log(err);
                        // Asigno el Rol
                        roleInstance.principals.create({
                          principalType: RoleMapping.USER,
                          principalId: userInstance.id,
                        }, function(err, principal) {
                          console.log(err);
                        });
                      });
                    }
                  });
              });
            }
          });
  });

  User.me = function(req, next) {
    var AccessToken = User.app.models.AccessToken;
    AccessToken.findForRequest(req, {}, function(aux, accesstoken) {
      var UserModel = User.app.models.User;
      UserModel.findById(accesstoken.userId, function(error, user) {
        next(error, user);
      });
    });
  };

  var originalSetup = User.setup;
  User.setup = function() {
        // call the original setup!
    originalSetup.apply(this, arguments);
  };

  User.remoteMethod(
    'me', {
      accepts: {arg: 'req', type: 'object', http: {source: 'req'}},
      returns: {arg: 'user', type: 'object'},
      /* http: {verb: 'get'}, */
    }
  );
};
