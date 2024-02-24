const gulp = require("gulp");
const gulpPug = require("gulp-pug");

const concat = require("gulp-concat-css");
const plumber = require("gulp-plumber"); //он заменяет pipeметод и удаляет стандартный onerrorобработчик errorсобытия, который по умолчанию отключает потоки при ошибке.
const del = require("del"); // очистка папки, не работает версия 7.0.0
const browserSync = require("browser-sync").create();

const postcss = require("gulp-postcss"); //постпроцессинг файлов css используя конфигурацию из
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const mediaquery = require("postcss-combine-media-query"); //объединяет media запросы, необязателен.
const sass = require("gulp-sass")(require("sass")); // подключение SCSS

function liveServer() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });
}

function pug() {
  return gulp
    .src("src/**.pug")
    .pipe(gulpPug({ pretty: true }))
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.reload({ stream: true }));
}
// функиция преобразования файлов формата scss в css, объединение в один бандл, постпроцессин css.
function scss() {
  const plugins = [autoprefixer(), mediaquery(), cssnano()];
  //!!! возможно последовательность файлов рассписывать не нужно , необходимо проверить в конце
  const scssFiles = [
    "src/styles/globals.scss",
    "src/styles/variables.scss",
    "src/styles/style.scss",
    "src/styles/themes.scss",
  ]
  return gulp
    .src(scssFiles)
    .pipe(plumber())
    .pipe(concat("bundle.scss"))
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.reload({ stream: true }));
}

//записывает шрифты woff2,woff в папку dist/fonts, минифицирует css шрифтов и закидывает их в dist/fonts
function fonts() {
  const plugins = [autoprefixer(), mediaquery(), cssnano()];
  return gulp
    .src("src/fonts/**/*.css")
    .pipe(postcss(plugins))
    .pipe(gulp.dest("dist/fonts/"))
    .pipe(gulp.src("src/fonts/**/*.{woff2,woff}"))
    .pipe(gulp.dest("dist/fonts/"))
    .pipe(browserSync.reload({ stream: true }));
}

//записывает scripts в папку dist
function scripts() {
  return gulp
    .src("src/scripts/*.js")
    .pipe(gulp.dest("dist/scripts/"))
    .pipe(browserSync.reload({ stream: true }));
}

//записывает images в папку dist
function images() {
  return gulp
    .src("src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}")
    .pipe(gulp.dest("dist/images"))
    .pipe(browserSync.reload({ stream: true }));
}

// очиста папки dist
function clean() {
  return del("dist");
}

//отслеживание файлов pug и запуск функции pug() в реальном времени
function watchFiles() {
  console.log("отслеживаю вайлы");
  gulp.watch(["src/**/*.pug"], pug);
  gulp.watch(["src/**/*.scss"], gulp.series(scss, fonts));
  gulp.watch(["src/**/*.js"], scripts);
  gulp.watch(["src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}"], images);
}

const build = gulp.series(
  clean,
  gulp.parallel(fonts, scss, scripts, images, pug)
);
const dev = gulp.parallel(build, watchFiles, liveServer);

exports.default = dev;
exports.dev = dev;
exports.build = build;

exports.pug = pug;
exports.scss = scss;
exports.fonts = fonts;
exports.scripts = scripts;
exports.clean = clean;
exports.live = liveServer;

// добавить модули из уроков по scss
//добавить функции конвертации из scss в css
// нужен ли html-minifier?
