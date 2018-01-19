const gulp = require('gulp');
const babel = require('gulp-babel');

const zip = require('gulp-zip');
const del = require('del');

gulp.task('clean', () => {
  return del([
    'manifest/**/*'
  ])
});

gulp.task('generate-manifest', () => {
  gulp.src(['platforms/MicrosoftTeams/images/contoso*', 'platforms/MicrosoftTeams/manifest.json'])
  .pipe(zip('helloworldapp.zip'))
  .pipe(gulp.dest('manifest'));
});

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
