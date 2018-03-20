const gulp = require('gulp')
const config = require('../config')

const iconfont = require('gulp-iconfont')
const iconfontCss = require('gulp-iconfont-css')

const cssStream = iconfontCss({
  fontName: config.font.name,
  cssClass: config.font.prefix,
  targetPath: config.font.stylesheet
})

// Build Stream for icon fonts
const fontStream = iconfont({
  prependUnicode: false,
  fontName: config.font.name,
  fontHeight: 1024,
  formats: [ 'ttf', 'eot', 'woff', 'woff2', 'svg' ],
  normalize: true
})

/**
 * Gulp task to build webfont with icons
 *
 * @returns {Stream}
 */
function buildWebfont () {
  return gulp.src(`${config.paths.svg}/**/*.svg`)
    .pipe(cssStream)
    .pipe(fontStream)
    .pipe(gulp.dest(config.paths.webfont))
}

module.exports = buildWebfont
