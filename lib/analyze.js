'use strict';

/* global -Promise */
var Promise = require('bluebird');

var scan = require('./scan.js');
var caniuse = require('./caniuse.js');
var _ = require('underscore');

var analyze = function analyze (tokens, supportedBrowsers) {
  var badTokens = [];

  // Loop over all tokens that match something in the caniuse-db
  _.each(tokens, function (token, key) {

    // Loop through suported browsers
    _.each(supportedBrowsers, function (versions, browser) {

      // Check through the supported versions and see if anything is a nogo
      _.find(versions, function (version) {
        if (caniuse.query(key, browser, version) === 'n') {
          badTokens.push(key);
          return true;
        }
      });
    });
  });

  return _.pick(tokens, badTokens);
};

var analyzeFiles = function (supportedBrowsers, parsedFileObjects) {
  return Promise.reduce(parsedFileObjects, function(badTokens, parsedFileObject) {
    parsedFileObject.unsupportedTokens = analyze(parsedFileObject.tokens, supportedBrowsers);
    badTokens.push(parsedFileObject);
    return badTokens;
  }, []);
};

module.exports = analyzeFiles;
