var config 		= require('../config')
if(!config.tasks.bower) return

var gulp 		= require('gulp')
var bowerFiles 	= require('main-bower-files')
var normalize 	= require('gulp-bower-normalize')
var path 		= require('path')

var paths = {
	src: config.tasks.bower.src,
	dest: path.join(config.root.dest, config.tasks.bower.dest),
	json: config.tasks.bower.json
}

var bowerTask = function() {
	return gulp.src(bowerFiles(), {base: paths.src})
	.pipe(normalize({bowerJson: paths.json}))
	.pipe(gulp.dest(paths.dest))
}

gulp.task('bower', bowerTask)
module.exports = bowerTask
