'use strict';

/* global -Promise */
var Promise = require('bluebird');

var _ = require('underscore');
var glob = Promise.promisify(require("glob"));;

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

var getSupportedBrowserList = function getUnsupportedBrowserList (browsers) {
  return {
    ie: ['6']
  };
};

module.exports = {
  getFileList: getFileList,
  getSupportedBrowserList: getSupportedBrowserList
};
