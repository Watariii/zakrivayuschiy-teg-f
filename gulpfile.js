const gulp = require("gulp");
const gulpPug = require("gulp-pug");

function pug() {
  return gulp.src("src/**.pug")
        .pipe(gulpPug({pretty:true}))
        .pipe(gulp.dest("dist/"));
}

exports.default = pug;
