'use strict';

var chai = require('chai');
var assert = chai.assert;

var caniuse = require('../lib/api.js');

describe('Supported Features', function () {
  it('window.atob',
    function (done) {
      var opts = {
        files: __dirname + '/fixtures/window/atob.js',
        browsers: {
          InternetExplorer: '>= 6'
        }
      };

      caniuse(opts)
        .then(function (badTokens) {
          assert(badTokens.length === 1);

          var badFile = badTokens[0];
          assert(badFile.filename === __dirname + '/fixtures/window/atob.js');
          assert(badFile.unsupportedTokens.length === 1);
          assert(badFile.unsupportedTokens[0].token === 'atob');
          done();
        })
    });
});
