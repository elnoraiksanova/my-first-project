"use strict";

const gulp = require('gulp');
	//watch = require('gulp-watch'),
const autoprefixer = require('gulp-autoprefixer');
	//sass = require('gulp-sass'),
const cssnano = require('cssnano');
const imagemin = require('gulp-imagemin');
const del = require("del");
	//pngquant = require('imagemin-pngquant'),
const browsersync = require("browser-sync").create();

function css() {
	return gulp
	  .src("src/styles/*.css")
	  .pipe(gulp.dest("build/styles/"))
	  .pipe(browsersync.stream());
}

function images() {
  return gulp
    .src("src/images/**/*")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: false,
              collapseGroups: true
            }
          ]
        })
      ])
    )
    .pipe(gulp.dest("build/images"));
}

function watchFiles() {
  gulp.watch("./src/styles/**/*", css);
  gulp.watch("./src/images/**/*", images);
}

function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./src"
    },
    port: 3000
  });
  done();
}

function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function watchFiles() {
  gulp.watch("./src/styles/**/*", css);
  //gulp.watch("./src/js/**/*", gulp.series(scriptsLint, scripts));
  gulp.watch("./build/images/**/*", images);
}

function clean() {
  return del(["./_site/assets/"]);
}

//const js = gulp.series(scriptsLint, scripts);
const build = gulp.series(clean, gulp.parallel(css, images));
const watch = gulp.parallel(watchFiles, browserSync);


exports.images = images;
exports.css = css;
//exports.js = js;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = build;