'use strict';

var fs = require('fs');
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

var getTokensMatchingCanIUse = function getTokensMatchingCanIUse (filename) {
  var content = fs.readFileSync(filename, 'utf-8');

  var parsedFile = esprima.parse(content, {
    loc: true,
    range: false,
    raw: false,
    tokens: true,
    comment: false,
    attachComment: false
  });

  var keywords = caniuse.keywords;

  var tokens = {};
  _.each(keywords, function (keyword) {
    var matchingTokens = _.filter(parsedFile.tokens, function (token) {
      if (omittedTokenTypes[token.type]) {
        return false;
      }
      if (token.value === keyword) {
        return true;
      }
    });

    if (matchingTokens && matchingTokens.length > 0) {
      tokens[keyword] = matchingTokens;
    }
  });

  return tokens;
};

module.exports = getTokensMatchingCanIUse;
