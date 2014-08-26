'use strict';

/* global -Promise */
var Promise = require('bluebird');

var _ = require('underscore');
var glob = Promise.promisify(require('glob'));

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

var getSupportedBrowserList = function getSupportedBrowserList (browsers) {
  return {
    'ie'      : ['6', '7', '8', '9', '10', '11']
    'firefox' : ['4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18',
                 '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32',
                 '33', '34']
  };
};

module.exports = {
  getFileList: getFileList,
  getSupportedBrowserList: getSupportedBrowserList
};
