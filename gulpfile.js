const gulp = require('gulp')

// Load tasks

const tasks = {
  android: require('./tasks/android'),
  optimizeSvg: require('./tasks/optimizeSvg'),
  webfont: require('./tasks/webfont'),
  ios: require('./tasks/ios'),
  meta: require('./tasks/meta')
}

// Set up tasks

gulp.task('optimize-svg', tasks.optimizeSvg)
gulp.task('android', [ 'optimize-svg' ], tasks.android)
gulp.task('webfont', [ 'optimize-svg', 'meta' ], tasks.webfont)
gulp.task('ios', [ 'optimize-svg', 'webfont' ], tasks.ios)
gulp.task('meta', tasks.meta)

gulp.task('default', [ 'optimize-svg', 'android', 'ios', 'meta' ])
