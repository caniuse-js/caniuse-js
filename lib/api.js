'use strict';

/* global -Promise */
var Promise = require('bluebird');
var _ = require('underscore');

var util = require('./util.js');
var scan = require('./scan.js');
var analyze = require('./analyze.js');

var supportedBrowsers = util.getSupportedBrowserList();

var scanFiles = function (files) {
  return Promise.map(files, function(file) {
    return scan(file)
      .then(function (tokens) {
        return analyze(tokens, supportedBrowsers);
      });
  });
}

var cani = function (files, browsers) {
  util.getFileList(files)
    .then(scanFiles)
    .then(function(badTokens) {
      console.log(badTokens);
    })
};

module.exports = cani;
