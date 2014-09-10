'use strict';

var chai = require('chai');
var assert = chai.assert;

/* global -Promise */
var Promise = require('bluebird');
var cani = require('../../lib/api.js');
var _ = require('underscore');
var path = require('path');

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
        assert(_.isArray(badTokens));
        done();
      });
    });

  it('should return the correct output format', function (done) {
    var caniuseOpts = {
      files:__dirname + '/../fixtures/window/atob.js',
      browsers: {
        InternetExplorer: ['6']
      }
    };
    var promise = cani(caniuseOpts, function (badTokens) {
      var badFile = badTokens[0];
      assert(_.isEqual(_.keys(badFile), ['filename', 'tokens']));
      assert(badFile.filename === path.resolve(__dirname + '/../fixtures/window/atob.js'));
      assert(_.isArray(badFile.tokens));

      var token = badFile.tokens[0];
      assert(token.token === 'atob');
      assert(_.isObject(token.location));

      done();
    });
  });
});
