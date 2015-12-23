<h1 align="center">This project is DEPRECATED. It does not yet work as designed and should not be used.</h1>

---

<h1 align="center">node-caniuse</h1>

<p align="center">
  <a title='Build Status' href="https://npmjs.org/package/caniuse-js">
    <img src='http://img.shields.io/npm/v/caniuse-js.svg' />
  </a>
  <a href='https://david-dm.org/caniuse-js/caniuse-js'>
    <img src='https://david-dm.org/caniuse-js/caniuse-js.svg' alt='Chat' />
  </a>
  <a href='http://travis-ci.org/caniuse-js/caniuse-js'>
    <img src='https://secure.travis-ci.org/caniuse-js/caniuse-js.svg?branch=master' />
  </a>
</p>

<h4 align="center">
  Check your JavaScript against the <a href='http://caniuse.com'>Can I Use</a> database
</h4>

***

## Quick Start

```shell
npm install node-caniuse
```

```javascript
var caniuse = require('node-caniuse');

caniuse({
  files: './src/**/*.js',
  browsers: {
    Chrome: '>= 5',
    Firefox: '>= 4',
    InternetExplorer: '>= 9'
  },
  reporter: 'console'
});
```

## API Reference

#####`caniuse(Object options [, Function callback])` -> `Promise`

The result (for both the resolved Promise and for the callback) is an Array where each element represents a file and it's bad tokens.

```javascript
[{
  "filename" : "path/to/file",
  "tokens"   : [{
    token: "<invalid token>",
    location: {...}
  }]
}]
```

**Note**: *The callback and the promise are equivalent and can be used interchangeably.*

***

###### > `option.files`

Type: `Array` `String`  
Default: `[]`

The files to be scanned by `caniuse`. Both the `String` and `Array` versions accept globs. E.g. `./src/**/*.js`

***

###### > `options.browsers`

Type: `Object`  
Default: `{}`

An object representing your browser support matrix in the following format:

```json
{
  <browser-name>: <browser-versions>
}
```

**browser versions** can be specified in the following three ways:

* Direct selection - `[9, 10, 11]` or `'11'`
* Versions newer than - `'> 9'` or `'>= 8'`
* Versions with Global Usage greater than - `'> 10%'`

**browser names** can be any of the following (case insensitive):

* `Android` for old Android stock browser.
* `BlackBerry` or `bb` for Blackberry browser.
* `Chrome` for Google Chrome.
* `Firefox` or `ff` for Mozilla Firefox.
* `Explorer` or `ie` or `InternetExplorer` for Internet Explorer.
* `iOS` or `ios_saf` for iOS Safari.
* `Opera` for Opera.
* `Safari` for desktop Safari.
* `OperaMobile` or `op_mob` for Opera Mobile.
* `OperaMini` or `op_mini` for Opera Mini.
* `ChromeAndroid` or `and_chr` for Chrome for Android
  (mostly same as common `Chrome`).
* `FirefoxAndroid` or `and_ff` for Firefox for Android.
* `ExplorerMobile` or `ie_mob` for Internet Explorer Mobile.

***

###### > `reporter`

Type: `String`  
Default: `null`

Specify the output format by choosing any of the [node-caniuse reporters](https://github.com/baer/node-caniuse/tree/master/lib/reporters)

```javascript
caniuse({
  files: './src/**/*.js',
  browsers: { Chrome: '>= 5' },
  reporter: 'console'
});
```
***

###### > `gobalIgnores`

Type: `Array`  
Default: `[]`

Ignore tokens that are properties of of the specified objects. This is helpful if you have libraries that act as polyfills for native behavior.

```javascript
caniuse({
  files: './src/**/*.js',
  browsers: { Chrome: '>= 5' },
  gobalIgnores: '_'
});
```

***

## License

[MIT License](http://opensource.org/licenses/MIT)
