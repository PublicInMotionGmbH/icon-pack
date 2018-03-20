const gulp = require('gulp')
const config = require('../config')
const createSvgToVectorDrawableStream = require('../lib/createSvgToVectorDrawableStream')

/**
 * Gulp task to create Android Vector Drawables based on SVGs
 *
 * @returns {Stream}
 */
function createAndroidDrawables () {
  return gulp.src(`${config.paths.svg}/**/*.svg`)
    .pipe(createSvgToVectorDrawableStream())
    .pipe(gulp.dest(config.paths.drawables))
}

module.exports = createAndroidDrawables
