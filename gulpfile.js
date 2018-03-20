const gulp = require('gulp')

// Load tasks

const tasks = {
  android: require('./tasks/android'),
  optimizeSvg: require('./tasks/optimizeSvg'),
  webfont: require('./tasks/webfont'),
  ios: require('./tasks/ios')
}

// Set up tasks

gulp.task('optimize-svg', tasks.optimizeSvg)
gulp.task('android', tasks.android)
gulp.task('webfont', tasks.webfont)
gulp.task('ios', [ 'webfont' ], tasks.ios)
gulp.task('default', [ 'optimize-svg', 'android', 'webfont', 'ios' ])
