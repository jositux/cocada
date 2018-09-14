module.exports = function(app) {
  var Ds = app.dataSources.db;
  //  var Book = app.models.Version;

  Ds.autoupdate('File', function(err) {
    if (err) throw err;
    console.log('\nAutoupdated table `File`.');
  });
};
