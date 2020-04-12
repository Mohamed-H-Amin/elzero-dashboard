var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    pug = require('gulp-pug'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps'),
    minify = require('gulp-minify');
// Html track
gulp.task('html', function(){
    return gulp.src('stage/html/*.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(livereload())
});
// Css track
gulp.task('css', function(){
    return gulp.src(["stage/css/**/*.css", "stage/css/**/.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload())
});
// js track
gulp.task('js', function(){
    return gulp.src("stage/js/*.js")
        .pipe(concat('main.js'))
        .pipe(minify())
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload())
});
// Watch Tasks
gulp.task('watch', function(){
    require('./server.js');
    require("./node_modules/gulp-watch-sass");
    livereload.listen();
    gulp.watch("stage/html/**/*.pug", ['html']);
    // gulp.watch(["stage/css/**/*.sass"], ['css']);
    gulp.watch(["stage/css/**/*.css", "stage/css/**/*.sass"], ['css']);
    // gulp.watch("stage/css/**/*.css", ['css']);
    // gulp.watch("stage/css/**/*.sass", ['css']);
    gulp.watch("stage/js/*.js", ['js']);
});

// gulp.task('default', ['css', 'watch']);

// exports.default = function() {
//     // You can use a single task
//     watch('stage/css/**/*.css', css);
//     watch('stage/css/**/*.sass', css);
// };

