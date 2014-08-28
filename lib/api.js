'use strict';

var _ = require('underscore');

var util = require('./util.js');
var scanFiles = require('./scan.js');
var analyzeFiles = require('./analyze.js');
var generateReport = require('./report.js');

var cani = function (files, browsers, cb) {
  return util.getFileList(files)
    .then(scanFiles)
    .then(analyzeFiles)
    .then(generateReport)
    .then(function(badTokens) {
      if (_.isFunction(cb)) { cb.call(null, badTokens); }
      return badTokens;
    });
};

module.exports = cani;
