var server = require('./server');
var ds = server.dataSources.db;
var cocadaTables = ["Project"];
var Project = app.models.Project;

ds.autoupdate(cocadaTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' - cocadaTables - '] created in ', ds.adapter.name);
  ds.disconnect();
});