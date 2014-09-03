'use strict';

var chai = require('chai');
var assert = chai.assert;

/* global -Promise */
var Promise = require('bluebird');
var _ = require('underscore');
var parseFiles = require('../../lib/parse.js');

describe('parse.js', function () {
  it('should return a promise that resolves to the results Array', function (done) {
    var filenames = [__dirname + '/../fixtures/window/atob.js'];
    var promise = parseFiles([], filenames);
    assert(promise instanceof Promise);

    promise.then(function (badTokens) {
      assert(badTokens instanceof Array);
      done();
    });
  });
});
