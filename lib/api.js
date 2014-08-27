'use strict';

var util = require('./util.js');
var scanFiles = require('./scan.js');
var analyzeFiles = require('./analyze.js');

var cani = function (files, browsers) {
  util.getFileList(files)
    .then(scanFiles)
    .then(analyzeFiles)
    .then(function(badTokens) {
      console.log(badTokens);
    });
};

module.exports = cani;
