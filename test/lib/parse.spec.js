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

  it('should resolve each file\'s tokens to the correct object format', function (done) {
    var filenames = [__dirname + '/../fixtures/window/atob.js'];

    parseFiles([], filenames)
      .then(function (badTokens) {
        _.each(badTokens, function (file) {
          assert(!_.isUndefined(file.filename));
          assert(_.isString(file.filename));
          assert(!_.isUndefined(file.tokens));
          assert(_.isArray(file.tokens));
        });
        done();
      });
  });

  it('should ignore expressions called on an Object defined in the globalVariabvles Array',
    function (done) {
      var filenames = [__dirname + '/../fixtures/window/atob.js'];

      parseFiles(['window'], filenames)
        .then(function (badTokens) {
          assert(_.isNull(badTokens));
          done();
        });
    });
});
