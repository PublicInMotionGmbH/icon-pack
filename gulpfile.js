const gulp = require('gulp')
const svgo = require('gulp-svgo')

gulp.task('optimize-svg', () => {
  return gulp.src('icons/svg/**/*.svg')
    .pipe(svgo())
    .pipe(gulp.dest('icons/svg'))
})
