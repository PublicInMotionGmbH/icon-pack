const through = require('through2')
const Vinyl = require('vinyl')

const VectorDrawable = require('svg2android/lib/VectorDrawable')

/**
 * Convert SVG contents into Android Vector Drawable
 *
 * @param {string} contents
 * @returns {string}
 */
function convertSvgToVectorDrawable (contents) {
  return VectorDrawable.createFromSVG(contents).toString()
}

/**
 * Create Gulp stream which will convert SVG files into Android Vector Drawables
 *
 * @returns {Stream}
 */
function createSvgToVectorDrawableStream () {
  return through.obj((file, x, cb) => {
    // Ignore empty files
    if (file.isNull()) {
      return cb(null, file)
    }

    // Ignore streams for now
    if (!file.isBuffer()) {
      throw new Error('We are handling buffers only.')
    }

    console.log(file.path)

    // Build XML file instead of previous SVG
    const drawable = new Vinyl({
      cwd: file.cwd,
      base: file.base,
      path: file.path.replace(/\.svg$/, '.xml'),
      contents: Buffer.from(convertSvgToVectorDrawable(file.contents.toString()))
    })

    cb(null, drawable)
  })
}

module.exports = createSvgToVectorDrawableStream
