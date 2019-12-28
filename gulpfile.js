// Dependencias

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');

// Minify JS

gulp.task('minjs', function() {
  console.log('minifying js');

  return gulp.src('source/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('MoMA_files/'));
});

// Minify CSS

gulp.task('mincss', () => {
  console.log('minifying css');

  return gulp.src('source/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('MoMA_files/'));
});

// imagemin

gulp.task('imgmin', () => {
  console.log('Minify PNG, JPEG, GIF and SVG images');

  return gulp.src('source/images/*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
          plugins: [
              {removeViewBox: true},
              {cleanupIDs: false}
          ]
      })

    ]))
    .pipe(gulp.dest('MoMA_files/'))
});

gulp.task('watch', function() {
    gulp.watch('source/*.js', ['minjs']);
    gulp.watch('source/*.css', ['mincss']);
    gulp.watch('source/images/*.{jpg,jpeg,png,gif}', ['imgmin']);
});

// Minify HTML
gulp.task('min-html', () => {
  return gulp.src('source/index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./'));
});
