'use strict';

/* global -Promise */
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var _ = require('underscore');
var esprima = require('esprima');
var estraverse = require('estraverse');
var caniuse = require('./caniuse.js');

var globals = [];

var parseFile = function (fileContents) {
  return esprima.parse(fileContents, {
    loc: true,
    range: false,
    raw: false,
    tokens: false,
    comment: false
  });
};

var saveNode = function (node) {
  // Only keep Expressions
  if (node.type !== 'CallExpression') {
    return false;
  }

  // Only keep nodes with information in the caniuseDB
  var object, property;
  if (node.callee.type === 'Identifier') {
    object = node.callee.name;

    if (_.contains(globals, object)) {
      return null;
    } else if (!_.contains(caniuse.keywords, object)) {
      return null;
    }

    return {
      token: object,
      location: node.loc
    };
  } else if (node.callee.type === 'MemberExpression') {
    object = node.callee.object.name;
    property = node.callee.property.name;

    if (_.contains(globals, object)) {
      return null;
    } else if (!_.contains(caniuse.keywords, property)) {
      return null;
    }

    return {
      token: property,
      location: node.loc
    };
  }
};

var traverseAST = function (ast) {
  var potentiallyDangerousExpressions = [];
  estraverse.traverse(ast, {
    enter: function (node) {
      var savableToken = saveNode(node);
      if (savableToken) {
        potentiallyDangerousExpressions.push(savableToken);
      }
    }
  });

  return potentiallyDangerousExpressions;
};

var constructReturnObject = function (filename, tokens) {
  return _.isEmpty(tokens) ? null : {
    filename: filename,
    tokens: tokens
  };
};

var getUsableTokens = function (filename) {
  return fs.readFileAsync(filename, 'utf-8')
    .then(parseFile)
    .then(traverseAST)
    .then(_.partial(constructReturnObject, filename));
};

var scanFiles = function (gobalIgnores, files) {
  globals = gobalIgnores;
  return Promise.map(files, getUsableTokens)
    .then(function (badTokensSparseArray) {
      var badTokens = _.compact(badTokensSparseArray);
      return _.isEmpty(badTokens) ? null : badTokens;
    });
};

module.exports = scanFiles;
