'use strict';

const gulp   = require('gulp'),                     // Our basic gulp API for our JavaScript to run tasks or watch for changes.
    sass   = require('gulp-sass'),                  // Convert our Sass to CSS for better quality code.
    del = require('del'),                           // Clean up our output asset file for front-end.
    sourcemaps = require('gulp-sourcemaps'),        // Generates sourcemap files for our CSS/JS.
    pug = require('gulp-pug'),                      // Compile our pug files into browser readable HTML.
    server = require('gulp-express'),
    autoprefixer = require('gulp-autoprefixer');    // Autoprefix our CSS for browsers that may not like certain CSS attributes.

const config = {
    scss: {
        input: "./src/scss/**/*.scss",
        output: "docs/css/",
        options: {
            outputStyle: "compressed",
            includePaths: ['node_modules/']
        }
    },
    pug: {
        input: "./src/pug/index.pug",
        output: "docs/",
        options: {
            outputStyle: "compressed"
        }
    },
    img: {
        input: "./src/img/**/*.{png,gif,jpg,svg}",
        output: "docs/img",
        options: {
        }
    },
    del: {
            input: "./docs"
    },
    autoprefixer: {
        options: {
            browsers: ['last 4 versions'],
            cascade: false
        }
    }
};

gulp.task('clean', () => {
  return del([config.del.input]).then(paths => {
      console.log('Deleted files and folders:\n', paths.join('\n'));     // Nifty little function that prints our what files we deleted. (Nothing special about this.)
  });
});

gulp.task('scss', ()=> {
  return gulp.src(config.scss.input)                          // Input all of our entry Sass files for compilation.
  .pipe(sourcemaps.init())                                   // Create a initial sourcemap entry point for debugging in the browser.
  .pipe(sass(config.scss.options).on('error', sass.logError))
  .pipe(autoprefixer(config.autoprefixer))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(config.scss.output));
});

gulp.task('pug', function buildHTML() {
  return gulp.src(config.pug.input)
  .pipe(pug())
  .pipe(gulp.dest(config.pug.output));
});

gulp.task('img', function buildHTML() {
  return gulp.src(config.img.input)
  .pipe(gulp.dest(config.img.output));
});


gulp.task('server', function() {
    server.run(['serve.js']);

    gulp.watch(config.scss.input, 'scss');
    gulp.watch(config.pug.input, 'pug');
    gulp.watch(config.img.input, 'img');
});

gulp.task('watch', ()=> {
    gulp.watch(config.scss.input, 'scss');
    gulp.watch(config.pug.input, 'pug');
    gulp.watch(config.img.input, 'img');
});


gulp.task('default', () => {
    gulp.start('scss', 'pug', 'img');
});

gulp.task('dev', () => {
    gulp.start('default', 'server');
});
