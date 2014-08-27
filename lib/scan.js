'use strict';

/* global -Promise */
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
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

var sortTokens = function (tokens) {
  var sortedTokens = {};
  _.each(tokens, function (token) {
    // Omits tokens we don't care about
    if (omittedTokenTypes[token.type]) { return; }

    if (_.isUndefined(sortedTokens[token.value])) {
      sortedTokens[token.value] = [token];
    } else {
      sortedTokens[token.value].push(token);
    }
  });
  return sortedTokens;
};

var filterUnrecognizedTokens = function (tokens) {
  var keywords = caniuse.keywords;

  return _.reduce(keywords, function (usableTokens, keyword) {
    if (tokens[keyword]) {
      usableTokens[keyword] = tokens[keyword];
    }
    return usableTokens;
  }, {});
};

var getUsableTokens = function (filename) {
  return fs.readFileAsync(filename, 'utf-8')
    .then(parseFile)
    .then(sortTokens)
    .then(filterUnrecognizedTokens)
    .error(function (e) {
      console.error('unable to read file, because: ', e.message);
    });
};

module.exports = getUsableTokens;
