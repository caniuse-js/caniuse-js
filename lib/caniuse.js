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
};

var query = function query(keyword, browser, version) {
  if (_.isUndefined(caniuse.agents[browser])) {
    throw new Error('You must use a valid browser');
  } else if (_.isUndefined(caniuse.agents[browser].versions[version])) {
    throw new Error('You must use a valid browser version');
  }

  var propertyData = _.find(caniuse.data, function (item) {
    return item.keywords.indexOf(keyword) !== -1;
  });
  var browserStatus = propertyData.stats[browser][version];

  return browserStatus;
};

module.exports = {
  query: query,
  keywords: getKeywords()
};
