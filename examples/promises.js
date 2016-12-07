// Style example

doSomething()
  .then(doThing2())
  .then(doThing3())
  .then(doThing4())
  .then(function(result) {
    doThing5(someArg, result);
  })
  .catch(function(e) {
      console.error("unable to read whatever")
  });

Promise.all([
    doThing2(),
    doThing3(),
    doThing4()
  ])
  .then(function(results) {
    doThing5(someArg, results);
  })
  .catch(function(e) {
      console.error("unable to read whatever")
  });



// Before

fs.readFile("file.json", function(err, json) {
    if(err) {
        console.error("unable to read file");
    } else {
        try {
            json = JSON.parse(json);
            console.log(json.success);
        }
        catch(e) {
            console.error("invalid json in file");
        }
    }
});


// After

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));

fs.readFileAsync("file.json")
  .then(JSON.parse)
  .then(function(json) {
    console.log(json.success);
})
.catch(SyntaxError, function(e) {
    console.error("invalid json in file");
})
.catch(function(e) {
    console.error("unable to read file")
});



// From Postnix.com

ns.mxLookup = function(domain) {
  return ns.mxLookupLocal(domain)
    .then(function(mxRecords) {
      if (!mxRecords) {
        return ns.mxLookupRemote(domain);
      }
      return mxRecords;
    });
};


// Check email chain
ns.checkSingleEmail = function(user, email, tag, ip) {
  return new Promise(function(fulfill, reject) {

    // First, see if user can check an email
    return ns.canUserCheckEmail(user, ip)
      .then(function() { // Local db lookup for cached result
        return ns.localEmailLookup(user, email, tag, ip);
      }, function(err) { // Error (no credits or restricted by IP)
        reject(err);
      })
      .then(function(json) {
        if (json) { // Return cached JSON response immediately
          return fulfill(json);
        }

        // Perform all lookups
        return ns.mxLookup(domain)
          .then(function(mxRecords) {
            if (!mxRecords) {
              throw new Error('no MX records exist for domain');
            }
            return ns.smtpCheck(user, email, mxRecords);
          })
          .then(function(json) {
            fulfill(json);
          });
      })
      .catch(function(err) {
        if(err.code == 'ECONNREFUSED') {
          err.json = ns.errorJson(email, 'connection to mail server refused');
        } else {
          err.json = ns.errorJson(email, err.message || 'connection timeout');
        }

        db.query("DELETE FROM email_mx WHERE domain = ?", [domain]);
        reject(err);
      });
  });
};
