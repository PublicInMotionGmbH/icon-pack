const gulp = require('gulp')
const svgo = require('gulp-svgo')
const config = require('../config')

/**
 * Gulp task to optimize SVG files
 *
 * @returns {Stream}
 */
function optimizeSvgFiles () {
  return gulp.src(`${config.paths.svg}/**/*.svg`)
    .pipe(svgo())
    .pipe(gulp.dest(config.paths.svg))
}

module.exports = optimizeSvgFiles
