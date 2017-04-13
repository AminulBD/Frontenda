var config 			= require('../config')
if(!config.tasks.css) return

var merge 			= require('merge-stream')
var gulp 			= require('gulp')
var clone 			= require('gulp-clone')
var browserSync 	= require('browser-sync')
var concat 			= require('gulp-concat')
var uglify 			= require('gulp-uglify')
var sourcemaps 		= require('gulp-sourcemaps');
var handleErrors 	= require('../lib/handleErrors')
var banner 			= require('../lib/banner')
var path 			= require('path')
var fs 				= require('fs')
var header 			= require('gulp-header')
var rename 			= require('gulp-rename')

var paths = {
	src: path.join(config.root.src, config.tasks.scripts.src, '/**/*.{' + config.tasks.scripts.extensions + '}'),
	dest: path.join(config.root.dest, config.tasks.scripts.dest),
	conf: path.join(config.root.src, config.tasks.scripts.src, config.tasks.scripts.configFile)
}

var scriptsTask = function () {
	var files = []
	var getConf = JSON.parse(fs.readFileSync(paths.conf, 'utf8'))

	getConf.jsFiles.forEach(function(item) {
		var item = path.join(config.root.src, config.tasks.scripts.src, item)
		files.push(item)
	})
	var prepare = gulp.src(files)
		.on('error', handleErrors)
		.pipe(sourcemaps.init())
		.pipe(concat('app.js'))
		.pipe(header(banner()))

	var compile = prepare
		.pipe(sourcemaps.write('./'))

	var minify = prepare.pipe(clone())
		.pipe(uglify())
		.on('error', handleErrors)
		.pipe(rename({
			suffix: ".min"
		}))

	var jobs = []
	jobs.push(compile)

	if ( global.production ) jobs.push(minify)

	return merge(jobs)
		.pipe(gulp.dest(paths.dest))
		.on('end', browserSync.reload)
}

gulp.task('scripts', scriptsTask)
module.exports = scriptsTask
