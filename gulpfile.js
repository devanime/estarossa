var fs = require('fs');
var path = require('path');
var merge = require('merge-stream');
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var prettify = require('gulp-jsbeautifier');
var del = require('del');
var count = require('gulp-count');

var scriptsPath = path.resolve('.');
var ignoreDir = ['node_modules', '.git'];
var rootFolders = (function() {
    return walk(scriptsPath).map(function(sourcePath) {
        var dir = sourcePath.replace('/bower.json', '');
        try {
            var files = fs.readdirSync(path.join(dir, 'js'));
            if (files.length < 2) {
                return null;
            }
        } catch (e) {
            return null;
        }
        return sourcePath.replace('/bower.json', '');
    }).filter(x => x);
})();

function walk(dir) {
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function(file) {
        if (ignoreDir.indexOf(file) >= 0) {
            return;
        }
        file = path.join(dir, file);
        if (file.indexOf('bower.json') >= 0) {
            results.push(file);
            return;
        }
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            /* Recurse into a subdirectory */
            results = results.concat(walk(file));
        }
    });
    return results;
}

gulp.task('clean', function() {
    return del(['**/dist/', '!node_modules/**']);
});
gulp.task('default', ['clean'], function() {
    return rootFolders.map(function(folder) {
        var filename = folder.split(path.sep).pop();
        return gulp.src([path.join(folder, 'vendor', '**', '*.js'), path.join(folder, 'js', '**', '*.js')])
            .pipe(concat(filename + '.js'))
            .pipe(uglify({
                compress: false,
                mangle: false,
            }))
            .pipe(prettify())
            .pipe(gulp.dest(path.join(folder, 'dist')))
            .pipe(uglify())
            .pipe(rename(filename + '.min.js'))
            .pipe(gulp.dest(path.join(folder, 'dist')));
    });
});
gulp.task('watch', function() {
    gulp.watch(rootFolders.map(function(folder) {
        return path.join(folder, 'js', '**', '*.js');
    }), ['default']);
});
