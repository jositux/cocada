'use strict';

module.exports = function(project) {
  //
  project.observe('after save', function(ctx, next) {
    if (ctx.instance.id) {
      const version = project.app.models.Version;
      // Si no tiene una version "Inicial", la creo.
      project.app.models.version.find({
        where: {
          'projectId': ctx.instance.id,
        }},
        function(err, versions) {
          if (versions.length == 0) {
            version.create({
              'projectId': ctx.instance.id,
              'parentVersionId': '', // first version
              'description': 'Modelo Inicial.',
              'authorId': ctx.instance.authorId,
            },
            function(err, VersionInstance) {
              console.log('Creada la versión inicial.');
              ctx.instance._lastVersion = VersionInstance;
              return next();
            });
          } else {
            return next();
          }
        });
    }
  });
  // calculated current image of project
/*  project.observe('loaded', function(ctx, next) {
    if (ctx.instance) {
      project.app.models.version.find({
        where: {
          'project_id': ctx.instance.id,
        },
        order: 'created DESC',
        limit: 1,
        fields: ['image'],
      }, function(err, versions) {
        if (err) return next(err);

        if (versions.length) {
          ctx.instance.lastImage = versions.pop().image;
        } else {
          ctx.instance.lastImage = null; // this will never happen. See 'after save'
        }
        return next();
      });
    } else {
      return next();
    }
  }); */

  // calculated _lastVersion property
  project.observe('loaded', function(ctx, next) {
    if (ctx.instance) {
      var x = project.app.models.version.find({
        where: {'projectId': ctx.instance.id},
        order: 'createdAt DESC',
        limit: 1,
      }, function(err, versions) {
        if (err) return next(err);
        if (versions.length) {
          ctx.instance._lastVersion = versions.pop();
        } else {
          ctx.instance._lastVersion = {}; // this will never happen. See 'after save'
        }
        return next();
      });
    } else {
      return next();
    }
  });
};
