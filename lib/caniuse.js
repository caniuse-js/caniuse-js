'use strict';

var _ = require('underscore');
var caniuse = require('caniuse-db/data');

var getKeywords = function () {
  var keywords = [];
  _.each(caniuse.data, function (item) {
    if (item.keywords === '') { return; }
    keywords = keywords.concat(item.keywords.split(','));
  });
  return keywords;
};

var getBrowsers = function () {
  return _.keys(caniuse.agents);
};

var query = function (keyword, browser, version) {
  if (_.isUndefined(caniuse.agents[browser])) {
    throw new Error('You must use a valid browser');
  } else if (!_.contains(caniuse.agents[browser].versions, version)) {
    throw new Error('You must use a valid browser version');
  }

  var propertyData = _.find(caniuse.data, function (item) {
    return item.keywords.indexOf(keyword) !== -1;
  });
  return propertyData.stats[browser][version];
};

module.exports = {
  query: query,
  keywords: getKeywords(),
  browsers: getBrowsers()
};
