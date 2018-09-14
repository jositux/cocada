module.exports = function(app) {
  var Ds = app.dataSources.db;
  var Book = app.models.Project;

  Ds.autoupdate('Project', function(err) {
      if (err) throw err;
      console.log('\nAutoupdated table `Project`.');
    });
};
