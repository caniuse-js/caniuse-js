'use strict';

var fs = require('fs');
var _ = require('underscore');
var esprima = require('esprima');

var omittedTokenTypes = {
  "Boolean": false,
  "Identifier": false,
  "Keyword": false,
  "Null": false,
  "Numeric": false,
  "Punctuator": true,
  "String": true,
  "RegularExpression": false
};

function scan (filename) {
  var content = fs.readFileSync(filename, 'utf-8');

  var parsedFile = esprima.parse(content, {
    loc: true,
    range: false,
    raw: false,
    tokens: true,
    comment: false,
    attachComment: false
  });

  var tokens = _.reject(parsedFile.tokens, function (token) {
    return omittedTokenTypes[token.type];
  })

  return tokens;
}

module.exports = scan;
