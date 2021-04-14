const URL = process.env.APP_ENV_URL;

const gulp = require('gulp');
const del = require('del');

/*유틸*/
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

/*view server*/
const browserSync = require('browser-sync').create();

/*scss, css*/
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const modifyCssUrls = require('gulp-modify-css-urls');
const pxtorem = require('gulp-pxtorem');

/*타입스크립트*/
const ts = require('gulp-typescript');
const tsProjectP = ts.createProject('tsconfig.json');
const tsProjectM = ts.createProject('tsconfig.mo.json');
const tsProject = (URL === 'mo') ? tsProjectM : tsProjectP;

/*오류 처리*/
const plumber = require('gulp-plumber');

/*babel*/
const babel = require('gulp-babel');

/*webpack*/
const webpack = require('webpack-stream');


const errorHandler = (error)=>{
  console.error(error.message);
  this.emit('end');
};
const plumberOption = {
  errorHandler: errorHandler,
};

const autoprefixBrowsers = ['> 0%', 'last 4 versions'];
const polyfill = './node_modules/@babel/polyfill/browser.js';


/*typescript*/
gulp.task('ts', ()=>{
  return tsProject.src()
      .pipe(plumber(plumberOption))
      .pipe(tsProject())
      .pipe(gulp.dest(`wwwroot/${URL}/assets/scripts/build/js`))
});

// babel 
gulp.task('babel', ()=>{
  return gulp
    .src([polyfill, `./wwwroot/${URL}/assets/scripts/build/js/*.js`], {allowEmpty: true})
    .pipe(babel({
      presets: [
        [ '@babel/preset-env', {
          targets: {
            browsers: [ 'last 1 version', 'ie >= 11' ]
          }
        }]
      ],
    }))
    .pipe(gulp.dest(`wwwroot/${URL}/assets/scripts/build/dist`))
});

//웹팩 모듈 번들러.. 모듈 코딩시에만 필요!
gulp.task('webpack', ()=>{
  return gulp
      .src(`./wwwroot/${URL}/assets/scripts/build/dist/*.js`
        , {allowEmpty: true}
      )
      .pipe(webpack({
        output: {filename: 'UI.bundle.js'},
      }))
      .pipe(gulp.dest(`wwwroot/${URL}/assets/scripts/build/bundle`))
});

gulp.task('sass', ()=>{
  return gulp
    .src(`wwwroot/${URL}/assets/scss/**/*.scss`)
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
    .pipe(gulp.dest(`wwwroot/${URL}/assets/styles`))
    .pipe(browserSync.reload({ stream: true }));
});
gulp.task('build', ()=>{
  return gulp
    .src(`wwwroot/${URL}/assets/scss/**/*.scss`)
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
    .pipe(gulp.dest(`wwwroot/${URL}/assets/styles/dist`))
    .pipe(browserSync.reload({ stream: true }))
    .on('end', function () {
      console.log('-------- appned css --------');
    });
});

gulp.task('clean', ()=>{
  return del([`wwwroot/${URL}/assets/scripts/build/js`], {force:true});
});


gulp.task('watch', ()=>{
  browserSync.init({
    //logLevel: 'debug',
    port: 3333,
    open: false,
    directory: true,
    server: './wwwroot/',
    browser: 'google chrome',
  });

  gulp.watch(
    `wwwroot/${URL}/assets/scss/**/*.scss`,
    gulp.series('sass', 'build')
  );

  gulp.watch(`wwwroot/${URL}/**/*.html`).on('change', browserSync.reload);
  gulp.watch(`wwwroot/${URL}/**/*.js`).on('change', browserSync.reload);
  gulp.watch(`wwwroot/${URL}/**/*.ts`).on('change', gulp.series('ts', 'babel', 'webpack', 'clean'));
});

gulp.task(
  'default',
  gulp.series('sass', 'build', 'ts', 'babel', 'webpack', 'clean', 'watch')
);
