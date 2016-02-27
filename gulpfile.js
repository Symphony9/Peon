var gulp = require('gulp');
var path = require('path');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');

gulp.task('clean', function () {
	return gulp.src('dist', {read: false})
		.pipe(clean());
});


gulp.task('compress', function () {
	return gulp.src('dist/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
})

gulp.task('watch', function() {
	var watcher = gulp.watch(['./js/*.js'], ['compile']);

	watcher.on('change', function(event) {
		if (event.path.lastIndexOf('/') > 0) {
			var filename = event.path.lastIndexOf('/');
		} else {
			var filename = event.path.lastIndexOf('\\');
		}
		filename = event.path.substr(filename + 1);
		console.log('File ' + filename + ' was ' + event.type + ', running tasks...');
	});
});

var jsFiles = [
	'js/peon.js'
]

gulp.task('concatjs', function() {
	return gulp.src(jsFiles)
		.pipe(sourcemaps.init())
			.pipe(concat('peon.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./dist'))
});

gulp.task('compile', function() {
  runSequence(
		'clean',
		'concatjs',
		'compress'
	);
});

gulp.task('default', function() {
	runSequence(
		'compile',
		'watch'
	);
});
