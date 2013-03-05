var sys = require('sys'), fs = require('fs'), util = require('util');
var JSV = require("./lib/jsv").JSV;
var env = JSV.createEnvironment('json-schema-draft-03');

fs.readFile('name.json', function(err, data) {
  if(err) throw err;
  var schema = JSON.parse(data);
  env.createSchema(schema, undefined, "name.json");
});

fs.readFile('realname.json', function(err, data) {
  if(err) throw err;
  var schema = JSON.parse(data);
  env.createSchema(schema, undefined, "realname.json");
});

// Load a schema by which to validate
fs.readFile('schema.json',function(err,data) {
  if(err) throw err;
  var schema = JSON.parse(data);
  // Load data file
  fs.readFile('./users.json',function(err,data) {
    if(err) throw err;
    // Parse as JSON
    var posts = JSON.parse(data);
    // Validate
    var report = env.validate(posts, schema);
    // Echo to command line
    console.log(util.inspect(report.errors, false, null));
  });
});

