# node-caniuse
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

> Check your JavaScript + browser support matrix against the [Can I Use database](http://caniuse.com/)

## Quick Start (Programatic Usage)

```shell
npm install node-caniuse
```

```javascript
var caniuse = require('node-caniuse');

caniuse({
  files: './src/**/*.js',
  browsers: {
    Chrome: '>= 5',
    Firefox: '>= 4'
    InternetExplorer: '>= 9'
  }
});
```

## Options

### files

Type: `Array` `String`  
Default: `[]`

The files to be scanned by `caniuse`. Both the `String` and `Array` versions accept globs. E.g. `./src/**/*.js`

### browsers

Type: `Object`  
Default: `{}`

An object representing your browser support matrix in the following format:

```
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

### reporter

Type: `String`  
Default: `null`

Specify the output format by choosing any of the [node-caniuse reporter](https://github.com/baer/node-caniuse/tree/master/lib/reporters)

```javascript
caniuse({
  files: './src/**/*.js',
  browsers: { Chrome: '>= 5' },
  reporter: 'console'
});
```

### gobalIgnores

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

---

## CLI Usage

```shell
npm install -g node-caniuse
node-caniuse --help
```

```shell
node-caniuse [files] {OPTIONS}

Standard Options:

    --reporter, -r  Specify the output reporter

    --browsers, -b  The list of targeted browsers

        --help, -h  Show this message
```

## License

[MIT License](http://opensource.org/licenses/MIT)

[npm-url]: https://npmjs.org/package/node-caniuse
[npm-image]: https://badge.fury.io/js/node-caniuse.png

[depstat-url]: https://david-dm.org/baer/node-caniuse
[depstat-image]: https://david-dm.org/baer/node-caniuse.png

[travis-url]: http://travis-ci.org/baer/node-caniuse
[travis-image]: https://secure.travis-ci.org/baer/node-caniuse.png?branch=master
