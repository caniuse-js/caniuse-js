'use strict';

var _ = require('underscore');
var caniuse = require('caniuse-db/data');

var getKeywords = function getKeywords () {
  var keywords = [];
  _.each(caniuse.data, function (item) {
    if (item.keywords === '') { return; }
    keywords = keywords.concat(item.keywords.split(','));
  });
  return keywords;
}

var query = function query(keyword, browser, version) {
  if (_.isUndefined(caniuse.agents[browser])) {
    throw new Error('You must use a valid browser');
  }
  if (_.isUndefined(caniuse.agents[browser].versions[version])) {
    throw new Error('You must use a valid browser version');
  }
  if (_.isUndefined(caniuse.data[keyword])) {
    throw new Error('The property `' + keyword + '` is no defined');
  }

  var propertyData = caniuse.data[keyword];
  var browserStatus = propertyData.stats[browser][version];

  return browserStatus;
}

module.exports = {
  query: query,
  getKeywords: getKeywords
};
