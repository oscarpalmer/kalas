var
gulp   = require("gulp"),
concat = require("gulp-concat"),
jshint = require("gulp-jshint"),
uglify = require("gulp-uglify");

gulp.task("default", function() {
  return gulp.src("src/kalas.js")
             .pipe(jshint())
             .pipe(jshint.reporter("default"))
             .pipe(uglify())
             .pipe(concat("kalas.js"))
             .pipe(gulp.dest("dist"));
});