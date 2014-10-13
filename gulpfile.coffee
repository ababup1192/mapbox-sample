# plugins
gulp = require 'gulp'
bowerFiles = require 'main-bower-files'
flatten = require 'gulp-flatten'
filter = require 'gulp-filter'
plumber = require 'gulp-plumber'
jade = require 'gulp-jade'
coffee = require 'gulp-coffee'
sass = require 'gulp-sass'
connect = require 'gulp-connect'
webpack = require 'gulp-webpack'

# Tasks

gulp.task 'bower', ['bower-js', 'bower-map', 'bower-css'], ->

gulp.task 'bower-js', ->
  jsFilter = filter('**/*.js')
  gulp.src(bowerFiles())
    .pipe(jsFilter)
    # import js libraries
    .pipe(gulp.dest('./dist/lib/js'))

gulp.task 'bower-map', ->
  mapFilter = filter('**/*.map')
  gulp.src(bowerFiles())
    .pipe(mapFilter)
    # import js libraries
    .pipe(gulp.dest('./dist/lib/js'))

gulp.task 'bower-css', ->
  cssFilter = filter('**/*.css')
  gulp.src(bowerFiles())
    .pipe(cssFilter)
    # import js libraries
    .pipe(gulp.dest('./dist/lib/css'))

# local server
gulp.task 'connect', ->
  connect.server(
    root: 'dist'
    livereload: true
  )

gulp.task 'jade', ->
  gulp.src('./jade/**/*.jade')
    .pipe(plumber())
    .pipe(jade(pretty: true))
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload())

gulp.task 'coffee', ->
  gulp.src('./coffee/**/*.coffee')
    .pipe(plumber())
    .pipe(coffee(bare: true))
    .pipe(gulp.dest('./dist/js/'))

gulp.task 'webpack', ['coffee'], ->
  gulp.src('./dist/js/entry.js')
    .pipe webpack
      output:
        filename: 'bundle.js'
    .pipe(gulp.dest('./dist/js/'))
    .pipe(connect.reload())

gulp.task 'sass', ->
  gulp.src('./sass/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(connect.reload())

gulp.task 'watch', ->
  gulp.watch(
    ['./jade/**/*.jade', './coffee/**/*.coffee', './sass/**/*.scss'],
    ['jade', 'webpack', 'sass']
  )

gulp.task 'info', ->
  console.log "Please connect http://dockerhost:8080"

gulp.task 'default', ['jade', 'webpack', 'sass', 'connect', 'watch', 'info']

