var gulp = require('gulp');

/*유틸*/
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

/*view server*/
var browserSync = require('browser-sync').create();

/*scss, css*/
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var modifyCssUrls = require('gulp-modify-css-urls');
var pxtorem = require('gulp-pxtorem');

/*타입스크립트*/
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

/*오류 처리*/
var plumber = require('gulp-plumber');

/*babel*/
var babel = require('gulp-babel');

/*webpack*/
var webpack = require('webpack-stream');



var errorHandler = function (error) {
  console.error(error.message);
  this.emit('end');
};
var plumberOption = {
  errorHandler: errorHandler,
};

var autoprefixBrowsers = ['> 0%', 'last 4 versions'];
var polyfill = './node_modules/@babel/polyfill/browser.js';

/*pc*/
gulp.task('tsPC', function () {
  return tsProject.src()
      .pipe(plumber(plumberOption))
      .pipe(tsProject())
      .pipe(gulp.dest('wwwroot/Guide/assets/scripts/build/js'))
});

// babel 
gulp.task('babelPC', function () {
  return gulp
    .src([polyfill, './wwwroot/Guide/assets/scripts/build/js/*.js'], {allowEmpty: true})
    .pipe(babel({
      presets: [
        [ '@babel/preset-env', {
          targets: {
            browsers: [ 'last 1 version', 'ie >= 11' ]
          }
        }]
      ],
      //plugins: ['@babel/transform-runtime'],
    }))
    .pipe(gulp.dest('wwwroot/Guide/assets/scripts/build/dist'))
});

//웹팩 모듈 번들러.. 모듈 코딩시에만 필요!
gulp.task('webpackPC', function () {
  return gulp
      .src('./wwwroot/Guide/assets/scripts/build/dist/*.js'
        , {allowEmpty: true}
      )
      .pipe(webpack({
        output: {filename: 'UI.bundle.js'},
      }))
      .pipe(gulp.dest('wwwroot/Guide/assets/scripts/build/bundle'))
});

gulp.task('sassPC', function () {
  return gulp
    .src('wwwroot/Guide/assets/scss/**/*.scss')
    .pipe(plumber(plumberOption))
    .pipe(
      sourcemaps.init({
        loadMaps: true,
      })
    )
    .pipe(
      sass({
        outputStyle: 'expanded', //[nested, compact, expanded, compressed]
        indentType: 'tab',
        indentWidth: 1,
      }).on('error', sass.logError)
    )
    .pipe(
      autoprefixer({
        browsers: autoprefixBrowsers,
        cascade: true,
      })
	)
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('wwwroot/Guide/assets/styles'))
    .pipe(browserSync.reload({ stream: true }));
});
gulp.task('buildPC', function () {
  return gulp
    .src('wwwroot/Guide/assets/scss/**/*.scss')
    .pipe(plumber(plumberOption))
    .pipe(
      sass({
        outputStyle: 'compressed', //[nested, compact, expanded, compressed]
      }).on('error', sass.logError)
    )
    .pipe(
      autoprefixer({
        browsers: autoprefixBrowsers,
        cascade: true,
      })
    )
    .pipe(gulp.dest('wwwroot/Guide/assets/styles/dist'))
    .pipe(browserSync.reload({ stream: true }))
    .on('end', function () {
      console.log('-------- appned css --------');
    });
});


gulp.task('watch', function () {
  browserSync.init({
    //logLevel: 'debug',
    port: 3333,
    open: false,
    directory: true,
    server: './wwwroot/',
    browser: 'google chrome',
  });

  gulp.watch(
    'wwwroot/Guide/assets/scss/**/*.scss',
    gulp.series('sassPC', 'buildPC')
  );

  gulp.watch('wwwroot/**/*.html').on('change', browserSync.reload);
  gulp.watch('wwwroot/**/*.js').on('change', browserSync.reload);
  gulp.watch('./**/*.ts').on('change', gulp.series('tsPC', 'babelPC', 'webpackPC'));
});

gulp.task(
  'default',
  gulp.series('sassPC', 'buildPC', 'tsPC', 'babelPC', 'webpackPC', 'watch')
);
