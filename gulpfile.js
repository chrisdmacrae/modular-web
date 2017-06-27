var gulp                = require('gulp'),
    foreach             = require('gulp-foreach'),
    postCSS             = require('gulp-postcss'),
    postHTML            = require('gulp-posthtml'),
    named               = require('vinyl-named'),
    rename              = require('gulp-rename'),
    webpack             = require('webpack-stream'),
    webpackConfig       = require('./webpack.config');

var config = {
  css: {
    src: './src/**/*.css',
    dest: './public'
  },
  js: {
    src: './src/**/*.js',
    dest: './public'
  },
  html: {
    src: './src/**/*.html',
    dest: './public'
  }
}

function basename(str, sep) {
  return str.substr(str.lastIndexOf(sep) + 1);
}

function repath(target, removal, pathOnly) {
  return target.replace(removal, '')
    .replace(pathOnly ? /\.[^/.]+$/ : '', '')
    .replace(new RegExp('\\' + path.sep, 'g'), '/');
}

gulp.task('css', function() {
  return gulp.src(config.css.src)
    .pipe(postCSS([
      require('postcss-modules'),
      require('cssnano')
    ]))
    .pipe(gulp.dest(config.css.dest));
});

gulp.task('html', ['css'], function() {
  return gulp.src(config.html.src)
    .pipe(foreach(function(stream, file){
      var currentDir = file.base,
          fileName = basename(file.history[0], '/').replace('.html', '.css.json')
      
      return stream
        .pipe(postHTML([
          require('posthtml-css-modules')([`${currentDir}/${fileName}`, `${currentDir}/styles.css`])
        ]))
    }))
    .pipe(gulp.dest(config.html.dest));
});

gulp.task('js', ['css'], function() {
  var tmp = {};

  return gulp.src(config.js.src)
    .pipe(named())
    .pipe(rename(function (path) {
      tmp[path.basename] = path;
    }))
    .pipe(webpack(webpackConfig)) 
    .pipe(rename(function (path) {
      var basename = path.basename.replace('.min', '')
      path.dirname = tmp[basename].dirname;
    }))
    .pipe(gulp.dest(config.js.dest))
});

gulp.task('build', ['default']);

gulp.task('default', ['css', 'js', 'html']);
