'use strict';

var chai = require('chai');
var assert = chai.assert;

/* global -Promise */
var Promise = require('bluebird');
var cani = require('../../lib/api.js');

describe('api.js', function () {
  it('should return a promise that resolves to the results Array', function (done) {
    var caniuseOpts = {
      files:__dirname + '/../fixtures/**/*.js',
      browsers: {}
    };
    var promise = cani(caniuseOpts);
    assert(promise instanceof Promise);

    promise.then(function (badTokens) {
      assert(badTokens instanceof Array);
      done();
    });
  });

  it('should call the callback function with the results Array as the first argument',
    function (done) {
      var caniuseOpts = {
        files:__dirname + '/../fixtures/**/*.js',
        browsers: {}
      };
      var promise = cani(caniuseOpts, function (badTokens) {
        assert(badTokens instanceof Array);
        done();
      });
    });
});
