'use strict';

var chai = require('chai');
var assert = chai.assert;

/* global -Promise */
var Promise = require('bluebird');
var _ = require('underscore');
var scanFiles = require('../../lib/scan.js');

describe('analyze.js', function () {
  it('should return a promise that resolves to the results Array', function (done) {
    var filenames = [__dirname + '/../fixtures/atob.js'];
    var promise = scanFiles(filenames);
    assert(promise instanceof Promise);

    promise.then(function (badTokens) {
      assert(badTokens instanceof Array);
      done();
    });
  });
});
