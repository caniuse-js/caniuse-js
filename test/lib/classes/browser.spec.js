'use strict';

var chai = require('chai');
var assert = chai.assert;

var _ = require('underscore');
var Browser = require('../../../lib/classes/browser.js');

describe('browser.js', function () {
  describe('Constructor', function () {
    it('should fail if no name is provided to the constructor', function () {
      try {
        var browser = new Browser();
        assert(false);
      } catch (e) {
        assert(true);
      }
    });

    it('should fail if an invalid browser is provided to the constructor', function () {
      try {
        var browser = new Browser('Umbrella');
        assert(false);
      } catch (e) {
        assert(true);
      }
    });

    it('should construct an Object with a name and version attribute', function () {
      var browser;

      browser = new Browser('ie');
      assert(browser.name === 'ie');
      assert(_.isObject(browser.versions));
      assert(!_.isEmpty(browser.versions));

      browser = new Browser('   ie');
      assert(browser.name === 'ie');
      assert(_.isObject(browser.versions));
      assert(!_.isEmpty(browser.versions));

      browser = new Browser('ie   ');
      assert(browser.name === 'ie');
      assert(_.isObject(browser.versions));
      assert(!_.isEmpty(browser.versions));

      browser = new Browser('   ie   ');
      assert(browser.name === 'ie');
      assert(_.isObject(browser.versions));
      assert(!_.isEmpty(browser.versions));
    });
  });

  describe('.getVersions()', function() {
    it('should return null if no versions match', function() {
      var browser = new Browser('ie');
      var browserList = browser.getVersions('10q');
      assert(_.isNull(browserList));

      browserList = browser.getVersions('');
      assert(_.isNull(browserList));

      browserList = browser.getVersions(['10q']);
      assert(_.isNull(browserList));

      browserList = browser.getVersions([]);
      assert(_.isNull(browserList));
    });

    it('should return an Array a version matches', function() {
      var browser = new Browser('ie');
      var browserList = browser.getVersions('6');
      assert(_.isArray(browserList));
    });

    it('should only accept a String or an Array', function() {
      var browser = new Browser('ie');
      var browserList = browser.getVersions('6');
      assert(_.isArray(browserList));

      browserList = browser.getVersions(['6']);
      assert(_.isArray(browserList));

      try {
        browserList = browser.getVersions({ie: [6]});
        assert(false);
      } catch (e) {
        assert(true);
      }
    });

    describe('directly selected versions', function() {
      it('should return an an Array containing all valid directly selected versions', function() {
        var browser = new Browser('ie');
        var browserList = browser.getVersions('6');
        assert(_.contains(browserList, '6'));

        browserList = browser.getVersions(['6', '7']);
        assert(_.contains(browserList, '6'));
        assert(_.contains(browserList, '7'));
      });

      it('should ignore directly selected versions that are not recognized', function() {
        var browser = new Browser('ie');
        var browserList = browser.getVersions(['4', '6', '7']);

        assert(browserList.length === 2);
        assert(!_.contains(browserList, '4'));
        assert(_.contains(browserList, '6'));
        assert(_.contains(browserList, '7'));
      });
    });

    describe('all versions greater than', function() {
      it('should return an Array with all browser versions greater than the specifier', function() {
        var browser = new Browser('ie');
        var browserList;

        browserList = browser.getVersions('> 9');
        assert(_.contains(browserList, '10'));
        assert(_.contains(browserList, '11'));
        assert(browserList.length === 2);

        browserList = browser.getVersions('>= 9');
        assert(_.contains(browserList, '9'));
        assert(_.contains(browserList, '10'));
        assert(_.contains(browserList, '11'));
        assert(browserList.length === 3);
      });
    });

    describe('all versions with global popularity greater than', function() {
      it('should return an Array with all browser versions with global popularity greater than ' +
         'the specifier', function() {
        var browser = new Browser('chrome');
        var browserList;

        browserList = browser.getVersions('> 10%');
        assert(_.contains(browserList, '36'));
        assert(browserList.length === 1);
      });
    });
  });
});
