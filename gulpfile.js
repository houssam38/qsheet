var gulp = require('gulp'),
    rimraf = require('rimraf'),
    plugins = require('gulp-load-plugins')({
        lazy: true
    }),
    watch = require('gulp-watch'),
    runSequence = require('run-sequence');

var paths = {
    src: [
        'src/**/*.html',
        'src/**/*.js',
        'src/**/*.css'
    ],
    dist: 'dist'
};

gulp.task('copy:src', function() {
    return gulp.src(paths.src).pipe(gulp.dest(paths.dist));
});

gulp.task('clean:dist', function(cb) {
    rimraf(paths.dist, cb);
});

gulp.task('compile', plugins.shell.task('tsc'));
gulp.task('server', plugins.shell.task('tsc && concurrently \"npm run tsc:w\" \"node server.js\"'));
gulp.task('watch', function () {
    gulp.watch('src/**/*.*', ['copy:src', 'compile']);
});

gulp.task('serve+watch', function(done) {
    runSequence('clean:dist', 'copy:src', 'server', 'watch', done);
});
