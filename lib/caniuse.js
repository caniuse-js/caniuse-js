'use strict';

var _ = require('underscore');
var caniuse = require('caniuse-db/data');
var logger = require('winston');

var getKeywords = function () {
  var keywords = [];
  _.each(caniuse.data, function (item) {
    if (item.keywords === '') { return; }
    keywords = keywords.concat(item.keywords.split(','));
  });
  return keywords;
};

var getBrowsers = function () {
  return caniuse.agents;
};

var query = function (keyword, browser, version) {
  if (_.isUndefined(caniuse.agents[browser])) {
    logger.warn('Skipping ' + browser, '- It is not a recognized browser');
    return null;
  } else if (!_.contains(caniuse.agents[browser].versions, version)) {
    logger.warn('Skipping ' + browser, version, '- It is not a recognized version');
    return null;
  }

  var propertyData = _.find(caniuse.data, function (item) {
    return item.keywords.indexOf(keyword) !== -1;
  });
  return propertyData ? propertyData.stats[browser][version] : null;
};

module.exports = {
  query: query,
  keywords: getKeywords(),
  browsers: getBrowsers()
};
