const rimraf = require('rimraf')
const fs = require('fs-extra')
const promisify = require('util').promisify

// Build promisified functions
const rmdir = promisify(rimraf)
const mkdir = promisify(fs.mkdirp)
const move = promisify(fs.move)
const writeFile = promisify(fs.writeFile)

/**
 * Remove directory and everything inside
 *
 * @param {string} dirPath
 * @param {object} [options]
 * @returns {Promise}
 */
function removeDirectory (dirPath, options) {
  return rmdir(dirPath, options || {})
}

/**
 * Create new directory
 *
 * @param {string} dirPath
 * @param {object} [options]
 * @returns {Promise}
 */
function createDirectory (dirPath, options) {
  return mkdir(dirPath, options || {})
}

/**
 * Clean directory contents
 *
 * @param {string} dirPath
 * @returns {Promise}
 */
function cleanDirectory (dirPath) {
  return Promise.resolve()
    .then(() => removeDirectory(dirPath))
    .then(() => createDirectory(dirPath))
}

/**
 * Move file
 *
 * @param {string} from
 * @param {string} to
 * @param {object} [options]
 * @returns {Promise}
 */
function moveFile (from, to, options) {
  return move(from, to, options || {})
}

/**
 * Save JSON file with specified contents
 *
 * @param {string} path
 * @param {*} data
 * @returns {Promise}
 */
function saveJson (path, data) {
  return writeFile(path, JSON.stringify(data, null, 2) + '\n')
}

exports.removeDirectory = removeDirectory
exports.createDirectory = createDirectory
exports.cleanDirectory = cleanDirectory
exports.moveFile = moveFile
exports.saveJson = saveJson
