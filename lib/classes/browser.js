'use strict';

var _ = require('underscore');
var logger = require('winston');
var browsers = require('../caniuse.js').browsers;

// Aliases for browser names
var aliases = {
  fx: 'firefox',
  ff: 'firefox',
  ios: 'ios_saf',
  internetexplorer: 'ie',
  explorer: 'ie',
  blackberry: 'bb',
  explorermobile: 'ie_mob',
  operamini: 'op_mini',
  operamobile: 'op_mob',
  chromeandroid: 'and_chr',
  firefoxandroid: 'and_ff'
};

// Available requirements to select browsers
var browserVersioningType = {
  newerThan: {
    regexp: /^(>=?)\s*([\d\.]+)/,
    select: function (sign, selectedVersion) {
      var filter;

      if (sign == '>') {
        filter = function(value, key, object) {
          return parseFloat(key) > parseFloat(selectedVersion)
        }
      }
      else if (sign == '>=') {
        filter = function(value, key, object) {
          return parseFloat(key) >= parseFloat(selectedVersion)
        }
      }

      return _.chain(this.versions)
        .pick(filter)
        .keys()
        .value();
    }
  },
  direct: {
    regexp: /^([\d\.]+)$/,
    select: function (version) {
      if (_.isUndefined(this.versions[version])) {
        logger.warn('Skipping ' + version, '- It is not a recognized browser version');
        return;
      }
      return [version];
    }
  },
  globalStatistics: {
    regexp: /^> (\d+(\.\d+)?)%$/,
    select: function (popularity) {
      return _.chain(this.versions)
        .pick(function(value, key, object) {
          return parseFloat(value) > parseFloat(popularity)
        })
        .keys()
        .value();
    }
  }
};

var Browser = function (name) {
  if (_.isUndefined(name)) {
    throw new Error('You must provide a browser name');
  }

  name = name.trim().toLowerCase();
  name = aliases[name] || name;
  if (_.isUndefined(browsers[name.trim().toLowerCase()])) {
    throw new Error(name, ' is not a valid browser');
  }

  this.name = name.trim().toLowerCase();
  this.versions = browsers[this.name].usage_global;
};

Browser.prototype._expandVersion = function (versionString) {
  var versionList = null;
  _.each(browserVersioningType, function (versioningType) {
    var match = versionString.match(versioningType.regexp)
    if (match) {
      versionList = versioningType.select.apply(this, match.slice(1));
    }
  }, this);
  return versionList;
}

Browser.prototype.getVersions = function (versions) {
  if (!_.isArray(versions) && !_.isString(versions)) {
    throw new Error('Browser versions can only be a String or an Array of Strings');
  }

  if (_.isString(versions)) { versions = [versions]; }

  var versionList = _.chain(versions)
    .map(this._expandVersion, this)
    .compact()
    .reduce(function (memo, expandedVersion) {
      memo = memo.concat(expandedVersion);
      return memo;
    }, [])
    .value();

  return _.isEmpty(versionList) ? null : versionList;
};

module.exports = Browser;
