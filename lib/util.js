'use strict';

/* global -Promise */
var Promise = require('bluebird');
var _ = require('underscore');
var glob = Promise.promisify(require('glob'));
var logger = require('winston');

var caniuse = require('./caniuse.js');

var getFileList = function getFileList (files) {
  if (_.isString(files)) {
    return glob(files);
  } else if (_.isArray(files)) {
    var fileSubLists = _.map(files, function (fileSubList) {
      return glob(fileSubList);
    });

    return Promise.reduce(fileSubLists, function(fileList, subList) {
      return fileList.concat(subList);
    }, []);
  }

  throw new Error('You can only provide a String or an Array of filenames');
};

var getSupportedBrowsers = function getSupportedBrowserList (browsers) {

  var supportedBrowsers = {};
  _.each(browsers, function (value, key) {
    var browser = key.trim().toLowerCase();
    var versions = [];

    if (_.isUndefined(caniuse.browsers[browser])) {
      logger.warn(key, 'is not a recognized browser');
      return;
    }
    if (!_.isArray(value) && !_.isString(value)) {
      logger.warn(key, 'versions can only be a String or an Array of Strings');
      return;
    }

    if (_.isString(value)) {
      // TODO: Parse string
      logger.info('Parsing of String values for the browser version is not yet implemented');
    } else if (_.isArray(value) && value.length > 0) {
      versions = _.filter(value, function (versionNumber) {
        return _.contains(caniuse.browsers[browser].versions, versionNumber);
      });
      supportedBrowsers[key] = versions;
    }
  });

  return supportedBrowsers;
};

module.exports = {
  getFileList: getFileList,
  getSupportedBrowsers: getSupportedBrowsers
};
