## node-caniuse
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

> Check your JavaScript + browser support matrix against the [Can I Use database](http://caniuse.com/)

## Usage

First, install `node-caniuse`

```shell
npm install -g node-caniuse
```

Then, to see what it can do just ask for help!

```shell
node-caniuse --help
```

##API Reference

#### Browser Versions

You can specify the browsers you want to target in your project in three ways

* Direct selection - `[9, 10, 11]` or `'11'`
* Versions newer than - `'> 9'` or `'>= 8'`
* Versions with Global Usage greater than - `'> 10%'`

#### Browser Names (case insensitive):

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

## License

[MIT License](http://opensource.org/licenses/MIT)

[npm-url]: https://npmjs.org/package/node-caniuse
[npm-image]: https://badge.fury.io/js/node-caniuse.png

[depstat-url]: https://david-dm.org/baer/node-caniuse
[depstat-image]: https://david-dm.org/baer/node-caniuse.png

[travis-url]: http://travis-ci.org/baer/node-caniuse
[travis-image]: https://secure.travis-ci.org/baer/node-caniuse.png?branch=master
