const gulp = require("gulp");
const gulpPug = require("gulp-pug");

const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');

const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const mediaquery = require('postcss-combine-media-query'); //объединяет media запросы, необязателен.

function pug() {
  return gulp.src("src/**.pug")
        .pipe(gulpPug({pretty:true}))
        .pipe(gulp.dest("dist/"));
}
function css() {
  const plugins = [
    autoprefixer(),
    mediaquery(),
    cssnano()
  ];
  return gulp.src('src/styles/*.css')
        .pipe(concat('bundle.css'))
        .pipe(postcss(plugins))
        .pipe(gulp.dest('dist/'))

}
//написать Функцию объединения CSS в один bundle
//написать Функцию постпроцессор для CSS

exports.default = pug;
exports.css = css;
