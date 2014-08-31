'use strict';

var fs = require('fs');
var path = require('path');
var _ = require('underscore');

var report = function (reporterName, unsupportedTokenData) {
  if (_.isString(reporterName)) {
    var reporterPath = path.resolve(__dirname + '/reporters/' + reporterName + '.js');
    if (fs.existsSync(reporterPath)) {
      var reporter = require('./reporters/' + reporterName + '.js');
      reporter(unsupportedTokenData);
    }
  }
  return unsupportedTokenData;
};

module.exports = report;
