'use strict';

var _ = require('underscore');

var util = require('./util.js');
var Browser = require('./classes/browser.js');
var parseFiles = require('./parse.js');
var analyzeFiles = require('./analyze.js');
var generateReport = require('./report.js');

var getSupportedBrowserVersions = function (browsers) {
  var browserSupportList = {};
  _.each(browsers, function (value, key) {
    var browserName = key.trim().toLowerCase();
    var browser = new Browser(browserName);
    browserSupportList[browser.name] = browser.getVersions(value);
  });
  return browserSupportList;
};

var cani = function (options, cb) {
  var opts = options || {};
  _.defaults(opts, {
    files: [],
    browsers: {},
    reporter: null,
    gobalIgnores: []
  });

  return util.getFileList(opts.files)
    .then(_.partial(parseFiles, opts.gobalIgnores))
    .then(_.partial(analyzeFiles, getSupportedBrowserVersions(opts.browsers)))
    .then(_.partial(generateReport, opts.reporter))
    .then(function(badTokens) {
      if (_.isFunction(cb)) { cb.call(null, badTokens); }
      return badTokens;
    });
};

module.exports = cani;
