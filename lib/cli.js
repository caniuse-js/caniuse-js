'use strict';

var program = require('commander');
var packageInfo = require('../package.json');

module.exports = function (argv) {
  program
    .version(packageInfo.version);

  program.on('--help', function(){
    console.log('This module is still under development...');
  });


  program.parse(process.argv);
};
