'use strict';

var scan = require('./scan.js');
var caniuse = require('./caniuse.js');
var _ = require('underscore');

var analyze = function analyze (tokens) {
  var badTokens = []
  _.each(tokens, function (token, key) {
    if (caniuse.query(key, 'ie', 7) === 'n') {
      badTokens.push(key);
    }
  });

  return _.pick(tokens, badTokens);
}

module.exports = analyze;
