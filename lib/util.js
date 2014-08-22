'use strict';

/* global -Promise */
var Promise = require('bluebird');
var _ = require('underscore');
var glob = require('glob');

var getFileList = function getFileList (files) {
  var fileList = [];

  return new Promise(function (resolve, reject) {
    if (_.isString(files)) {
      glob(files, function (err, files) {
        if (err) {
          reject(err);
        }
        fileList = files;
        resolve(fileList);
      });
    } else if (_.isArray(files)) {
      // TODO
    } else {
      throw new Error('You can only provide a String or an Array of filenames');
    }
  });
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
