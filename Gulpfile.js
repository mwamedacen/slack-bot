const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', () => {
  gulp.src('app/properties/message')
  .pipe(gulp.dest('dist/app/properties'));

  gulp.src('app.js')
  .pipe(babel())
  .pipe(gulp.dest('dist'));

  gulp.src('app/**/*.js')
  .pipe(babel())
  .pipe(gulp.dest('dist/app'));


  gulp.src('node_modules/**/*.js').pipe(gulp.dest('dist/node_modules'));
});
