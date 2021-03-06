module.exports = {
  paths: {
    cache: 'cache',
    svg: 'icons/svg',
    ios: 'icons/ios',
    drawables: 'icons/android',
    webfont: 'webfont',
    meta: 'metadata.js'
  },
  font: {
    name: 'TalixoIcons',
    prefix: 'tai',
    stylesheet: 'style.css',
    fontOnlyStylesheet: 'style.font.css'
  },
  raster: {
    defaultColor: 'black',
    defaultSize: 24,
    defaultDensity: 1,
    colors: {
      black: 'black',
      white: 'white',
      talixo: '#ff4800'
    },
    sizes: [ 18, 24, 36, 48 ],
    densities: [ 1, 2, 3 ]
  }
}
