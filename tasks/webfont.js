const path = require('path')
const gulp = require('gulp')
const glob = require('glob')
const fs = require('fs-extra')

const iconfont = require('gulp-iconfont')
const iconfontCss = require('gulp-iconfont-css')

const config = require('../config')

const templates = {
  main: path.join(__dirname, '..', 'templates', 'stylesheet.css'),
  fontOnly: path.join(__dirname, '..', 'templates', 'stylesheetFontOnly.css')
}

const cssStream = iconfontCss({
  path: templates.main,
  fontName: config.font.name,
  cssClass: config.font.prefix,
  targetPath: config.font.stylesheet
})

const cssFontOnlyStream = iconfontCss({
  path: templates.fontOnly,
  fontName: config.font.name,
  cssClass: config.font.prefix,
  targetPath: config.font.fontOnlyStylesheet
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
  const stream = gulp.src(`${config.paths.svg}/**/*.svg`)
    .pipe(cssStream)
    .pipe(cssFontOnlyStream)
    .pipe(fontStream)
    .pipe(gulp.dest(config.paths.webfont))

  // TODO: Make fix to gulp-iconfont-css and get rid of that
  // gulp-iconfont-css has problems with multiple CSS generated
  // and adds prefix to last one
  stream.on('finish', () => {
    // Get desired paths of stylesheets
    const stylesPath = path.join(config.paths.webfont, config.font.stylesheet)
    const stylesFontOnlyPath = path.join(config.paths.webfont, config.font.fontOnlyStylesheet)

    // Get glob patterns to find prefixed names
    const stylesGlob = path.join(path.dirname(stylesPath), 'u????-' + path.basename(stylesPath))
    const stylesFontOnlyGlob = path.join(path.dirname(stylesFontOnlyPath), 'u????-' + path.basename(stylesFontOnlyPath))

    // Get all broken file paths
    const files = [
      ...glob.sync(stylesGlob),
      ...glob.sync(stylesFontOnlyGlob)
    ]

    for (const filePath of files) {
      // Remove codepoint information from path
      const destinationPath = filePath.replace(/\/u[0-9a-fA-F]{4}-/, '/')

      // Rename file correctly
      fs.moveSync(filePath, destinationPath, { overwrite: true })
    }
  })

  return stream
}

module.exports = buildWebfont
