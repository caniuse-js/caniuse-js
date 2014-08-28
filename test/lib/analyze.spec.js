'use strict';

var chai = require('chai');
var assert = chai.assert;

/* global -Promise */
var Promise = require('bluebird');
var _ = require('underscore');
var analyze = require('../../lib/analyze.js');

describe('analyze.js', function () {
  it('should return a promise that resolves to the results Array', function (done) {
    var supportMatrix = {'ie': ['6']};
    var parsedFileObjects = [{
      unsupportedTokens: {}
    }];
    var promise = analyze(supportMatrix, parsedFileObjects);
    assert(promise instanceof Promise);

    promise.then(function (badTokens) {
      assert(badTokens instanceof Array);
      done();
    });
  });
});
