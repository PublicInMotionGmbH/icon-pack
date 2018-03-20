module.exports = {
  paths: {
    cache: 'cache',
    svg: 'icons/svg',
    ios: 'icons/ios',
    drawables: 'icons/android',
    webfont: 'webfont'
  },
  font: {
    name: 'TalixoIcons',
    prefix: 'tai',
    stylesheet: 'style.css'
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
