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
var cleanCss = require('gulp-clean-css');
var modifyCssUrls = require('gulp-modify-css-urls');
var pxtorem = require('gulp-pxtorem');

/*타입스크립트*/
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

/*오류 처리*/
var plumber = require('gulp-plumber');



var errorHandler = function (error) {
  console.error(error.message);
  this.emit('end');
};
var plumberOption = {
  errorHandler: errorHandler,
};

var autoprefixBrowsers = ['> 0%', 'last 4 versions'];

/*pc*/
gulp.task('tsPC', function () {
  return tsProject.src()
      .pipe(plumber(plumberOption))
      .pipe(tsProject())
      //.pipe(uglify())
      .pipe(gulp.dest('wwwroot/Guide/assets/js/dist'))
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

  //gulp.watch('wwwroot/scripts/**/*.js',  gulp.series('uglify'));
  gulp.watch(
    'wwwroot/Guide/assets/scss/**/*.scss',
    gulp.series('sassPC', 'buildPC')
  );

  gulp.watch('wwwroot/**/*.html').on('change', browserSync.reload);
  gulp.watch('wwwroot/**/*.js').on('change', browserSync.reload);
  gulp.watch('./**/*.ts').on('change', gulp.series('tsPC'));
});

gulp.task(
  'default',
  gulp.series('sassPC', 'buildPC', 'tsPC', 'watch')
);
