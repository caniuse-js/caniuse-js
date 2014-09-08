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

module.exports = {
  getFileList: getFileList
};
