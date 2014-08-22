'use strict';

var fs = require('fs');
var scan = require('./scan.js');
var analyze = require('./analyze.js');

var checkFiles = function (files) {
  var tokensToCheck = scan(files);
  var badTokens = analyze(tokensToCheck);
  return badTokens;
};

module.exports = checkFiles;
