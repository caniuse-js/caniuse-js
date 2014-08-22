'use strict';

var fs = require('fs');
var _ = require('underscore');
var Promise = require('bluebird');
var glob = require('glob');

var scan = require('./scan.js');
var analyze = require('./analyze.js');

var getFileList = function getFileList (files) {
  var fileList = [];

  return new Promise(function (resolve, reject) {
    if (_.isString(files)) {
      glob(files, function (err, files) {
        if (err) {
          reject(err)
        }
        fileList = files
        resolve(fileList);
      });
    } else if (_.isArray(files)) {
      // TODO: This needs to be properly promisified
      // _.each(files, function () {
      //   glob(files, function (er, files) {
      //     fileList = fileList.concat(files);
      //   });
      // })
    } else {
      throw new Error('You can only provide a String or an Array of filenames');
    }
  });
}

var checkFiles = function (files) {
  getFileList(files)
    .then(function (files) {
      _.each(files, function (file) {
        var tokensToCheck = scan(file);
        var badTokens = analyze(tokensToCheck);
        return badTokens;
      });
    });
};

module.exports = checkFiles;
