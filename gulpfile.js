const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");

gulp.task("default", () => {
	browserSync.init({
		server: {
			baseDir: "./",
		}
	});

	gulp.watch("./**/*.html").on("change", () => browserSync.reload());
	gulp.watch("./dev/js/*.js").on("change", () => browserSync.reload());
	gulp.src("src/images/*")
		.pipe(imagemin())
		.pipe(gulp.dest("../dev/img"));

	gulp.watch("./**/sass/**/*.scss", gulp.parallel(["sass"]));
});

gulp.task("sass", function () {
	return gulp.src("./dev/sass/**/*.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(autoprefixer({
			browsers: ["last 2 versions"],
		}))
		.pipe(gulp.dest("./dev/css"))
		.pipe(browserSync.stream());
});
