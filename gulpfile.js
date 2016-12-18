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
        css: 'build/css/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/main.js',
        style: 'src/style/main.scss'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss'
    },
    clean: './build'
};

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        },
        tunnel: true,
        host: 'localhost',
        port: 8080
    });
});

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger()) //start rigger
        .pipe(gulp.dest(path.build.html)) //export to build folder
        .pipe(reload({stream: true})); //reload server
});

gulp.task('js:build', function () {
    pump([
      gulp.src(path.src.js), //finds main.js file
      rigger(), //start rigger
      sourcemaps.init(), //initialise sourcemap
      uglify(), //compress js file
      sourcemaps.write('.'), //write sourcemap
      gulp.dest(path.build.js), //export to build folder
      reload({stream: true}) //reload server
    ]);
});

gulp.task('style:build', function () {
  gulp.src(path.src.style)
    .pipe(sourcemaps.init()) //initialise sourcemap
    .pipe(sass({
        includePaths: require('node-normalize-scss').includePaths
    })) //compile styles
    .pipe(autoprefixer()) //add prefixes
    .pipe(cleanCSS()) //compress styles
    .pipe(sourcemaps.write('.')) //write sourcemap
    .pipe(gulp.dest(path.build.css)) //export to build folder
    .pipe(reload({stream: true})); //reload server
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
});

gulp.task('default', ['build', 'watch', 'browser-sync']); //default task