'use strict';

var fs = require('fs');
var scan = require('./scan.js');
var analyze = require('./analyze.js');

var checkFile = function (filename) {
  var tokensToCheck = scan(filename);
  var badTokens = analyze(tokensToCheck);
  return badTokens;
};
