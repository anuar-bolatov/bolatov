var gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    rigger = require('gulp-rigger'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/main.js',
        style: 'src/style/main.scss',
        img: 'src/img/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: './build'
    },
    tunnel: true,
    host: 'localhost',
    port: 8080
};


gulp.task('sass', function () {
  gulp.src('path/to/input.scss')
    .pipe(sass({
      // includePaths: require('node-normalize-scss').with('other/path', 'another/path') 
      // - or - 
      includePaths: require('node-normalize-scss').includePaths
    }))
    .pipe(gulp.dest('path/to/output.css'));
});


gulp.task('default', function() {
  // place code for your default task here
});