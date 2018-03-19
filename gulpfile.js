const gulp = require('gulp')
const svgo = require('gulp-svgo')

const createSvgToVectorDrawableStream = require('./lib/createSvgToVectorDrawableStream')

gulp.task('optimize-svg', () => {
  return gulp.src('icons/svg/**/*.svg')
    .pipe(svgo())
    .pipe(gulp.dest('icons/svg'))
})

gulp.task('android', () => {
  return gulp.src('icons/svg/**/*.svg')
    .pipe(createSvgToVectorDrawableStream())
    .pipe(gulp.dest('icons/android'))
})
