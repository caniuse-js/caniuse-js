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
    loc: false,
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
      return false;
    } else if (!_.contains(caniuse.keywords, object)) {
      return false;
    }
  } else if (node.callee.type === 'MemberExpression') {
    object = node.callee.object.name;
    property = node.callee.property.name;

    if (_.contains(globals, object)) {
      return false;
    } else if (!_.contains(caniuse.keywords, property)) {
      return false;
    }
  }

  return true;
};

var traverse = function (ast) {
  var potentiallyDangerousExpressions = [];

  estraverse.traverse(ast, {
    enter: function (node) {
      if (saveNode(node)) {
        potentiallyDangerousExpressions.push(node);
      }
    }
  });
};

var constructReturnObject = function (filename, tokens) {
  return {
    filename: filename,
    tokens: tokens
  };
};

var getUsableTokens = function (filename) {
  return fs.readFileAsync(filename, 'utf-8')
    .then(parseFile)
    .then(traverse)
    .then(_.partial(constructReturnObject, filename));
};

var scanFiles = function (files) {
  return Promise.map(files, getUsableTokens);
};

module.exports = scanFiles;
