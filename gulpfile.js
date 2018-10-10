const gulp = require('gulp');
const mocha = require('gulp-mocha');

gulp.task('test:unit', () => {
  return gulp.src('tests/unit/*.js', {read: false}).pipe(mocha({reporter: 'spec'}));
});

gulp.task('test:api', () => {
  return gulp.src('tests/api/*.js', {read: false}).pipe(mocha({reporter: 'spec', timeout: 10000}));
});

gulp.task('default', [ 'test:unit', 'test:api' ]);