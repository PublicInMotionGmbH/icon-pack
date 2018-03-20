const gulp = require('gulp')
const rename = require('gulp-rename')

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
    .pipe(rename({ prefix: 'ic_' }))
    .pipe(gulp.dest(config.paths.drawables))
}

module.exports = createAndroidDrawables
