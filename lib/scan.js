'use strict';

/* global -Promise */
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var _ = require('underscore');
var esprima = require('esprima');
var caniuse = require('./caniuse.js');

var omittedTokenTypes = {
  'Boolean': false,
  'Identifier': false,
  'Keyword': false,
  'Null': false,
  'Numeric': false,
  'Punctuator': true,
  'String': true,
  'RegularExpression': false
};

var parseFile = function (rawContents) {
  return esprima.parse(rawContents, {
    loc: true,
    range: false,
    raw: false,
    tokens: true,
    comment: false,
    attachComment: false
  }).tokens;
};

var filterUnrecognizedTokens = function (tokens) {
  var keywords = caniuse.keywords;
  var usableTokens = {};

  _.each(keywords, function (keyword) {
    var matchingTokens = _.filter(tokens, function (token) {
      if (omittedTokenTypes[token.type]) {
        return false;
      }
      if (token.value === keyword) {
        return true;
      }
    });

    if (matchingTokens && matchingTokens.length > 0) {
      usableTokens[keyword] = matchingTokens;
    }
  });

  return usableTokens;
};

var getUsableTokens = function (filename) {
  return fs.readFileAsync(filename, 'utf-8')
    .then(parseFile)
    .then(filterUnrecognizedTokens)
    .error(function (e) {
      console.error("unable to read file, because: ", e.message);
    });
};

module.exports = getUsableTokens;
