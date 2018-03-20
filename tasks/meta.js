const glob = require('glob')

const utils = require('../lib/utils')
const config = require('../config')

// Regular expression to extract icon name from path
const regex = /\/([^/]+)\.svg$/

/**
 * Get icon name by its path
 *
 * @param {string} iconPath
 * @returns {string|null}
 */
function getIconName (iconPath) {
  const match = iconPath.match(regex)

  if (!match) {
    return null
  }

  return match[1]
}

/**
 * Gulp task to build webfont with icons
 *
 * @returns {Promise}
 */
function generateMetadata () {
  const icons = glob.sync('icons/svg/**/*.svg')
    .map(getIconName)
    .filter(x => x)

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
