const gulp = require('gulp');
const babel = require('gulp-babel');

const zip = require('gulp-zip');
const del = require('del');

gulp.task('clean-manifest', () => del(['manifest/**/*']));

gulp.task('generate-manifest', ['clean-manifest'], () => {
  gulp.src(['platforms/MicrosoftTeams/images/contoso*', 'platforms/MicrosoftTeams/manifest.json'])
  .pipe(zip('microsoftteamsbotapp.zip'))
  .pipe(gulp.dest('manifest'));
});

gulp.task('clean-dist', () => del(['dist']));

gulp.task('default',['clean-dist'], () => {
  gulp.src('app/properties/message')
  .pipe(gulp.dest('dist/app/properties'));

  gulp.src('app.js')
  .pipe(babel())
  .pipe(gulp.dest('dist'));

  gulp.src('app/**/*.js')
  .pipe(babel())
  .pipe(gulp.dest('dist/app'));


  gulp.src('node_modules/**/*')
  .pipe(gulp.dest('dist/node_modules'));
});
