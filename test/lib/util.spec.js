'use strict';

var chai = require('chai');
var assert = chai.assert;

/* global -Promise */
var Promise = require('bluebird');
var _ = require('underscore');
var path = require('path');
var util = require('../../lib/util.js');

describe('util.js', function () {
  describe('getFileList', function () {
    it('should throw an exception when passed an invalid object');

    it('should return a promise when given a string or an Array', function () {
      var promise = util.getFileList(__dirname + '/../fixtures/btoa.js');
      assert(promise instanceof Promise);
    });

    it('should use resolve an array with a single file when passed a filename as a string',
       function (done) {
         util.getFileList(__dirname + '/../fixtures/btoa.js')
           .then(function (files) {
             assert(_.isArray(files));
             assert.equal(files.length, 1);
             assert.equal(files[0], path.resolve(__dirname + '/../fixtures/btoa.js'));
             done();
           });
       });

    it('should use resolve an array with a single file when passed a filename as an array',
      function (done) {
        util.getFileList([__dirname + '/../fixtures/btoa.js'])
          .then(function (files) {
            assert(_.isArray(files));
            assert.equal(files.length, 1);
            assert.equal(files[0], path.resolve(__dirname + '/../fixtures/btoa.js'));
            done();
          });
      });

    it('should use minimatch to resolve to an array of files when passed an array of paths ' +
      'containing stars', function (done) {
        util.getFileList([__dirname + '/../fixtures/**/*.js'])
          .then(function (files) {
            assert(_.isArray(files));
            assert.equal(files.length, 1);
            assert(_.contains(files, path.resolve(__dirname + '/../fixtures/btoa.js')));
            done();
          });
      });

    it('should use minimatch to resolve to an array of files when passed a string of paths ' +
      'containing stars', function (done) {
        util.getFileList(__dirname + '/../fixtures/**/*.js')
          .then(function (files) {
            assert(_.isArray(files));
            assert.equal(files.length, 1);
            assert(_.contains(files, path.resolve(__dirname + '/../fixtures/btoa.js')));
            done();
          });
      });
  });

  describe('getSupportedBrowserList', function () {
    it('should return a promise when given a string or an Array');
  });
});
