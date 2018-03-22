const fs = require('fs')
const glob = require('glob')
const path = require('path')

const utils = require('../lib/utils')
const config = require('../config')

const extractCodePointsFromStyles = require('../lib/extractCodePointsFromStyles')

// Get path to stylesheet of webfont
const stylesheetPath = path.join(config.paths.webfont, config.font.stylesheet)

/**
 * Gulp task to build webfont with icons
 *
 * @returns {Promise}
 */
function generateMetadata () {
  const css = fs.readFileSync(stylesheetPath, 'utf8')
  const icons = extractCodePointsFromStyles(config.font.prefix, css)

  const data = {
    colors: Object.keys(config.raster.colors),
    sizes: config.raster.sizes,
    densities: config.raster.densities,

    classPrefix: config.font.prefix,

    defaults: {
      color: config.raster.defaultColor,
      size: config.raster.defaultSize,
      density: config.raster.defaultDensity
    },

    icons: icons
  }

  const contents = `module.exports = ${JSON.stringify(data, null, 2)}\n`

  return utils.saveFile(config.paths.meta, contents)
}

module.exports = generateMetadata
