/**
 * Extract code points from webfont stylesheet
 * @param {string} prefix
 * @param {string} css
 * @returns {object}
 */
function extractCodePointsFromStyles (prefix, css) {
  // Build regular expression for search
  const regex = new RegExp(`\\.${prefix}-([^:]+):before{content:'\\\\([0-9a-fA-F]+)';}`, 'g')

  // Remove all whitespaces - we don't need them
  css = css.replace(/\s+/g, '')

  // Create map of codepoints
  const icons = {}

  // Iterate over all icons
  while (true) {
    // Find next icon
    const match = regex.exec(css)

    // Stop on end
    if (!match) {
      break
    }

    // Save icon in map
    icons[match[1]] = JSON.parse(`"\\u${match[2].toLowerCase()}"`)
  }

  return icons
}

module.exports = extractCodePointsFromStyles
