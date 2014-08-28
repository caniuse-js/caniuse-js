'use strict';

var chai = require('chai');
var assert = chai.assert;

var _ = require('underscore');
var caniuse = require('../../lib/caniuse.js');

describe('caniuse.js', function () {
  describe('keywords', function () {
    it('should be an Array of Strings', function () {
      assert(_.isArray(caniuse.keywords));
      assert(_.isString(caniuse.keywords[0]));
    });

    it('should have a non-zero length', function () {
      assert(caniuse.keywords.length > 0);
    });
  });

  describe('browsers', function () {
    it('should be an Object containing Objects', function () {
      assert(_.isObject(caniuse.browsers));
      assert(_.isObject(caniuse.browsers[_.keys(caniuse.browsers)[0]]));
    });

    it('should not be empty', function () {
      assert(!_.isEmpty(caniuse.browsers));
    });

    it('should contain browser Objects with a versions attribute', function () {
      var browser = caniuse.browsers[_.keys(caniuse.browsers)[0]];
      assert(_.isArray(browser.versions));
    });
  });

  describe('query', function () {
    it('should ignore invalid browsers');
    it('should ignore invalid browser+version combinations');
    it('should return an Object if match is found');
    it('should return null if no match is found');
  });
});
