var gulp        = require('gulp');
var browserSync = require('browser-sync');
var connect = require('gulp-connect');

// Static server
gulp.task('serve', function() {
    browserSync.init([
    		'./js/**.js', 
    		'./js/**/**.js', 
    		'./index.html',
    		'./css/*.css'],{
    	port:3001,
        server: {
            baseDir: "./"
        }
    });
});  

gulp.task('connect', function() {
  connect.server({
    root: '.',
    port: 3001,
    livereload: false
  });
});