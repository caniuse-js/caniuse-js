'use strict';

var _ = require('underscore');

var util = require('./util.js');
var parseFiles = require('./parse.js');
var analyzeFiles = require('./analyze.js');
var generateReport = require('./report.js');

var cani = function (options, cb) {
  var opts = options || {};
  _.defaults(opts, {
    files: [],
    browsers: {},
    reporter: null,
    gobalIgnores: []
  });

  var supportedBrowsers = util.getSupportedBrowsers(opts.browsers);

  return util.getFileList(opts.files)
    .then(_.partial(parseFiles, opts.gobalIgnores))
    .then(_.partial(analyzeFiles, supportedBrowsers))
    .then(_.partial(generateReport, opts.reporter))
    .then(function(badTokens) {
      if (_.isFunction(cb)) { cb.call(null, badTokens); }
      return badTokens;
    });
};

module.exports = cani;
