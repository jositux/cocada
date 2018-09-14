module.exports = function(app) {
  var Ds = app.dataSources.db;
    // var Book = app.models.Version;

  Ds.autoupdate('Comment', function(err) {
    if (err) throw err;
    console.log('\nAutoupdated table `Comment`.');
  });

  Ds.autoupdate('Comment_files', function(err) {
    if (err) throw err;
    console.log('\nAutoupdated table `Comment_files`.');
  });
};

