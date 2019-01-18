'use strict';

module.exports = function(Comment) {
    // calculated author property
  Comment.observe('loaded', function(ctx, next) {
    if (ctx.instance) {
      var x = Comment.app.models.user.find({
        where: {'id': ctx.instance.authorId},
        limit: 1,
      }, function(err, author) {
        if (err) return next(err);
        if (author.length) {
          ctx.instance.author = author.pop();
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
