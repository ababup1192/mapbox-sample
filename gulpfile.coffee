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

# Tasks

gulp.task 'bower', ->
  jsFilter = filter('**/*.js')
  cssFilter = filter('**/*.css')
  # import js libraries
  gulp.src(bowerFiles())
    .pipe(jsFilter)
    .pipe(gulp.dest('./dist/lib/js'))
    # import css libraries
    .pipe(cssFilter)
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
    ['jade', 'coffee', 'sass']
  )

gulp.task 'info', ->
  console.log "Please connect http://dockerhost:8080"

gulp.task 'default', ['jade', 'coffee', 'sass', 'connect', 'watch', 'info']

