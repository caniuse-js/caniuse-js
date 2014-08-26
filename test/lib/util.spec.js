'use strict';

var chai = require('chai');
var assert = chai.assert;

/* global -Promise */
var Promise = require('bluebird');
var util = require('../../lib/util.js');

describe('util.js', function () {
  describe('getFileList', function () {
    it('should return a promise when given a string or an Array', function () {
      var promise = util.getFileList(__dirname + '/../fixtures/btoa.js');
      assert(promise instanceof Promise);
    });
    it('should throw an exception when passed an invalid object');
    it('should use resolve an array with a single file when passed a filename as a string');
    it('should use resolve an array with a single file when passed filename as an string');
    it('should use minimatch to resolve to an array of files when passed an array with strings ' +
       'containing stars');
    it('should use minimatch to resolve to an array of files when passed a string with stars');
  });

  describe('getSupportedBrowserList', function () {
    it('should return a promise when given a string or an Array');
  });
});
