var dns = require('dns');

var nsLookup = function(domain, timeout, callback) {
  var callbackCalled = false;
  var doCallback = function(err, domains) {
    if (callbackCalled) return;
    callbackCalled = true;
    callback(err, domains);
  };

  setTimeout(function() {
    doCallback(new Error("Timeout exceeded"), null);
  }, timeout);

  dns.resolveNs(domain, doCallback);
};

nsLookup('stackoverflow.com', 1000, function(err, addresses) {
  console.log("Results for stackoverflow.com, timeout 1000:");
  if (err) {
    console.log("Err: " + err);
    return;
  }
  console.log(addresses);
});

nsLookup('stackoverflow.com', 1, function(err, addresses) {
  console.log("Results for stackoverflow.com, timeout 1:");
  if (err) {
    console.log("Err: " + err);
    return;
  }
  console.log(addresses);
});