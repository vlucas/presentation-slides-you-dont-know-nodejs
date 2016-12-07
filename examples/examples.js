

// Callback

$.get('http://nodejs.org', function(data) {
    console.log(data);
});




// Node

var fs = require('fs');

fs.readFile('myfile.txt', function(err, data) {
  console.log(data);
});



// Database

db.users.find({ name: 'John' }, function(err, users) {
  users.forEach(function(user) {
    console.log(user);
  });
});
