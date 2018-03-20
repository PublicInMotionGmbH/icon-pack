const path = require('path')
const spawn = require('child_process').spawn
const bin = 'icon-font-to-png'

function ttf2png (ttf, css, output, color = 'black', size = 24, icons = [ 'ALL' ]) {
  ttf = path.resolve(ttf)
  css = path.resolve(css)
  output = path.resolve(output)

  const args = [ '--keep_prefix', '--filename', output, '--ttf', ttf, '--css', css, '--size', size, '--color', color, ...icons ]

  return new Promise((resolve, reject) => {
    const child = spawn(bin, args)

    child.on('close', code => {
      if (code === 0) {
        resolve()
      } else {
        reject()
      }
    })
  })
}

module.exports = ttf2png
