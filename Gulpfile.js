const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', () => {
  gulp.src('app.js')
  .pipe(babel())
  .pipe(gulp.dest('dist'));

  gulp.src('app/**/*.js')
  .pipe(babel())
  .pipe(gulp.dest('dist/app'));

  gulp.src('node_modules/**/*.js').pipe(gulp.dest('dist/node_modules'));
});
