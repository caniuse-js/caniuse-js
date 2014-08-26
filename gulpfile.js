'use strict';

var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var jscs   = require('gulp-jscs');
var mocha  = require('gulp-mocha');

var src = [
  './lib/**/*.js',
  './bin/**/*.js',
  './test/**/*.spec.js',
  'index.js',
  'gulpfile.js'
];

gulp.task('jshint', function() {
  return gulp.src(src)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('jscs', function () {
  return gulp.src(src)
    .pipe(jscs());
});

gulp.task('test', function () {
  return gulp.src('./test/**/*.spec.js', {read: false})
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task('default', ['jshint', 'jscs', 'test']);
