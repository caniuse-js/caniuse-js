'use strict';

/* global -Promise */
var Promise = require('bluebird');

var caniuse = require('./caniuse.js');
var _ = require('underscore');

var analyze = function analyze (tokenObjects, supportedBrowsers) {
  var badTokens = [];

  // Loop over all tokens that match something in the caniuse-db
  _.each(tokenObjects, function (tokenObject) {
    // Loop through suported browsers
    _.each(supportedBrowsers, function (versions, browser) {
      // Check through the supported versions and see if anything is a nogo
      _.find(versions, function (version) {
        if (caniuse.query(tokenObject.token, browser, version) === 'n') {
          badTokens.push(tokenObject);
          return true;
        }
      });
    });
  });

  return badTokens;
};

var analyzeFiles = function (supportedBrowsers, parsedFileObjects) {
  return Promise.reduce(parsedFileObjects, function(badTokens, parsedFileObject) {
    parsedFileObject.tokens = analyze(parsedFileObject.tokens, supportedBrowsers);
    if (!_.isEmpty(parsedFileObject.tokens)) {
      badTokens.push(parsedFileObject);
    }
    return badTokens;
  }, []);
};

module.exports = analyzeFiles;
