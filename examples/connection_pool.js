// Problem
var options    = require('../config')
  // ...
	, mysql      = require('mysql')
	, connection = mysql.createConnection(options.mysql);

connection.query('SELECT id, setting_name, setting_value FROM settings', function(err, results) {
  // ...
});




// Fix
var options    = require('../config')
  // ...
	, mysqlPool  = require('./mysqlPool')

// Use MySQL pool for queries
var connection = mysqlPool.create({ logSql: false }, "DBPool", options.mysql);

connection.query('SELECT id, setting_name, setting_value FROM settings', function(err, results) {
  // ...
});
