var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var jscs   = require('gulp-jscs');

gulp.task('jshint', function() {
  return gulp.src('./lib/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('jscs', function () {
  return gulp.src('./lib/*.js')
    .pipe(jscs());
});

gulp.task('default', ['jshint', 'jscs']);
