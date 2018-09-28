var server = require('./server');
var ds = server.dataSources.db;
var cocadaTables = ['Project', 'Version'];
var Project = app.models.Project;
var Version = app.models.Version;

ds.automigrate(cocadaTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' - cocadaTables - '] created in ', ds.adapter.name);
  ds.disconnect();
});
