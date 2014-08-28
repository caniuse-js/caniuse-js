'use strict';

var _ = require('underscore');

var util = require('./util.js');
var scanFiles = require('./scan.js');
var analyzeFiles = require('./analyze.js');
var generateReport = require('./report.js');

var cani = function (options, cb) {
  var opts = options || {};
  _.defaults(opts, {
    files: [],
    browsers: {},
    reporter: null
  });

  var supportedBrowsers = util.getSupportedBrowsers(opts.browsers);

  return util.getFileList(opts.files)
    .then(scanFiles)
    .then(_.partial(analyzeFiles, supportedBrowsers))
    .then(_.partial(generateReport, opts.reporter))
    .then(function(badTokens) {
      if (_.isFunction(cb)) { cb.call(null, badTokens); }
      return badTokens;
    });
};

module.exports = cani;
