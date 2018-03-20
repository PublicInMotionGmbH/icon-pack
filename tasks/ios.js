const gulp = require('gulp')
const glob = require('glob')
const unique = require('lodash/uniq')

const ttf2png = require('../lib/ttf2png')
const utils = require('../lib/utils')

const config = require('../config')

// Build regular expression to inspect icon file path
const escapedPrefix = config.font.prefix.replace(/[.]/g, $0 => `\\${$0}`)
const iconInspectRegex = new RegExp(`([0-9.]+)x([^-]*)-${escapedPrefix}-(.+)\.png$`)

/**
 * Build filename for icon based on its name and density
 *
 * @param {string} name
 * @param {number|string} density
 * @returns {string}
 */
function buildFilenameForDensity (name, density) {
  density = parseFloat(density)

  return density === config.raster.defaultDensity
    ? `${name}.png`
    : `${name}_${density}x.png`
}

/**
 * Build Contents.json file for specified icon
 *
 * @param {string} name
 * @returns {Promise}
 */
function buildContentsFile (name) {
  const filePath = `${config.paths.ios}/${name}.imageset/Contents.json`

  return utils.saveJson(filePath, {
    images: config.raster.densities.map(density => ({
      filename: buildFilenameForDensity(name, density),
      idiom: 'universal',
      scale: `${density}x`
    })),
    info: {
      author: 'xcode',
      version: 1
    }
  })
}

/**
 * Build suffix based on color name and icon size
 *
 * @param {string} colorName  Our internal color name
 * @param {number} size  Size in points
 * @returns {string}
 */
function buildSuffix (colorName, size) {
  let suffix = ''

  if (colorName !== config.raster.defaultColor) {
    suffix += `_${colorName}`
  }

  if (size !== config.raster.defaultSize) {
    suffix += `_${size}pt`
  }

  return suffix
}

/**
 * Export raster icons from TTF + CSS webfont
 *
 * @param {number} size
 * @param {string} color  HEX or universal name color
 * @param {number} [density]
 * @param {string} [suffix]
 * @returns {Promise}
 */
function toRaster (size, color, density = 1, suffix = '') {
  return ttf2png(
    `${config.paths.webfont}/${config.font.name}.ttf`,
    `${config.paths.webfont}/${config.font.stylesheet}`,
    `${config.paths.cache}/${density}x${suffix}-`,
    color,
    size * density
  )
}

/**
 * Gather information about icon based on their file path in cache
 *
 * @param {string} iconPath
 * @returns {null|object|{ path: string, density: number, suffix: string, fileName: string }}
 */
function inspectIconPath (iconPath) {
  const match = iconPath.match(iconInspectRegex)

  // Ignore when it doesn't match - probably some other cache files are there
  if (!match) {
    return null
  }

  // Gather all information we can
  const density = parseFloat(match[1])
  const suffix = match[2]
  const name = match[3]
  const fileName = buildFilenameForDensity(`${name}${suffix}`, density)

  return {
    path: iconPath,
    density: density,
    suffix: suffix,
    name: name,
    fileName: fileName
  }
}

/**
 * Find icons in cache which has specified suffix
 *
 * @param {string} suffix
 * @returns {Array<object|{ path: string, density: number, suffix: string, fileName: string }>}
 */
function findCachedIcons (suffix) {
  const pattern = `${config.paths.cache}/*x${suffix}-${config.font.prefix}-*.png`

  return glob.sync(pattern)
    .map(inspectIconPath)
    .filter(x => x)
}

/**
 * Move icons from cache into correct directories,
 * and generate Contents.json for them
 *
 * @param {string} suffix
 * @returns {Promise}
 */
function moveIcons (suffix) {
  // Find icons with specified suffix
  const icons = findCachedIcons(suffix)

  // Move icons in correct directories
  const promises = icons.map(icon => {
    const dir = `${config.paths.ios}/${icon.name}${suffix}.imageset`

    return utils.moveFile(icon.path, `${dir}/${icon.fileName}`, { overwrite: true })
  })

  // Find unique icon names (ignoring density)
  const names = icons.map(icon => `${icon.name}${icon.suffix}`)
  const uniqNames = unique(names)

  // Generate Contents.json files
  const contentsPromises = uniqNames.map(buildContentsFile)

  // Resolve when everything is done
  return Promise.all([
    ...promises,
    ...contentsPromises
  ])
}

/**
 * Extract raster icons from webfont based on internal color name and size
 *
 * @param {string} colorName  Internal color name
 * @param {number} size  In points
 * @returns {Promise}
 */
function extractIcons (colorName, size) {
  const suffix = buildSuffix(colorName, size)
  const color = config.raster.colors[colorName]

  const promises = config.raster.densities
    .map(density => toRaster(size, color, density, suffix))

  return Promise.all(promises)
    .then(() => moveIcons(suffix))
}

/**
 * Build all variations of raster icons based on configuration
 *
 * @returns {Promise}
 */
function buildAllIcons () {
  const promises = []
  const colorNames = Object.keys(config.raster.colors)

  for (const size of config.raster.sizes) {
    for (const colorName of colorNames) {
      promises.push(extractIcons(colorName, size))
    }
  }

  return Promise.all(promises)
}

/**
 * Gulp task to build icons for iOS
 *
 * @returns {Promise<void>}
 */
function buildIconsForIos () {
  return Promise.resolve()
    .then(() => utils.cleanDirectory('cache'))

    .then(() => buildAllIcons())

    .then(() => utils.removeDirectory('cache'))
    .then(() => utils.removeDirectory('exported'))
}

module.exports = buildIconsForIos
