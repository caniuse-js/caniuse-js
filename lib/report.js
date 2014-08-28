'use strict';

var fs = require('fs');
var path = require('path');
var _ = require('underscore');

var report = function (reporter, unsupportedTokenData) {
  if (_.isString(reporter)) {
    var reporterPath = path.resolve(__dirname + '/reporters/' + reporter + '.js');
    if (fs.existsSync(reporterPath)) {
      var reporter = require('./reporters/' + reporter + '.js');
      reporter(unsupportedTokenData);
    }
  }
  return unsupportedTokenData;
};

module.exports = report;
