'use strict';

module.exports = function(Comment) {
    // calculated author property
  Comment.observe('loaded', function(ctx, next) {
    if (ctx.instance) {
      var x = Comment.app.models.user.find({
        where: {'id': ctx.instance.author_id},
        limit: 1,
      }, function(err, versions) {
        if (err) return next(err);
        if (versions.length) {
          ctx.instance.author = versions.pop();
        } else {
          ctx.instance.author = {}; // this will never happen. See 'after save'
        }
        return next();
      });
    } else {
      return next();
    }
  });
};
