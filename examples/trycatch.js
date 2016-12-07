var fs = require('fs');

try {
  fs.readFile('doesnotexist.txt', function(err, data) {
    throw new Error('File does not exist!');
  });
} catch(e) {
  console.log('There was an error, but it\'s cool, because I handled it, right?');
}
