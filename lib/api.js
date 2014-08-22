'use strict';

var _ = require('underscore');

var util = require('./util.js');
var scan = require('./scan.js');
var analyze = require('./analyze.js');

var cani = function (files, browsers) {
  var supportedBrowsers = util.getSupportedBrowserList(browsers);

  util.getFileList(files)
    .then(function (files) {
      _.each(files, function (file) {
        var tokensToCheck = scan(file);
        var badTokens = analyze(tokensToCheck, supportedBrowsers);
        return badTokens;
      });
    });
};

module.exports = cani;
