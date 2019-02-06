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
        {where: {and: [{username: 'persona-a'}]}, limit: 1},
        function(err, records) {
          if (!records.length) {
            User.create({
              username: 'persona-a',
              email: 'desgin@localhost',
              password: 'persona-a',
              created: datetime,
              lastUpdated: datetime,
            },
            function(err, userInstance) {
              console.log("Creado usuario 'persona-a' con contraseña 'persona-a'.");
              console.log(userInstance);

              Role.find(
                {where: {and: [{name: 'cliente'}]}, limit: 1},
                function(err, records) {
                  if (!records.length) {
                    Role.create({
                      name: 'cliente',
                    }, function(err, roleInstance) {
                      console.log("Creado el rol 'cliente'");
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
          {where: {and: [{username: 'persona-b'}]}, limit: 1},
          function(err, records) {
            if (!records.length) {
              User.create({
                username: 'persona-b',
                email: 'persona-b@localhost',
                password: 'persona-b',
                created: datetime,
                lastUpdated: datetime,
              },
              function(err, userInstance) {
                console.log("Creado usuario 'persona-b' con contraseña 'persona-b'.");
                console.log(userInstance);

                Role.find(
                  {where: {and: [{name: 'diseñador'}]}, limit: 1},
                  function(err, records) {
                    if (!records.length) {
                      Role.create({
                        name: 'diseñador',
                      }, function(err, roleInstance) {
                        console.log("Creado el rol 'diseñador'");
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
};
