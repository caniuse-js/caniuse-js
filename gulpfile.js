'use strict';

var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var jscs   = require('gulp-jscs');

var src = [
  './lib/*.js',
  './bin/*.js',
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

gulp.task('default', ['jshint', 'jscs']);
