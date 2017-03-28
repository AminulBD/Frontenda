var config 			= require('../config')
if(!config.tasks.css) return

var merge 			= require('merge-stream')
var gulp 			= require('gulp')
var clone 			= require('gulp-clone')
var browserSync 	= require('browser-sync')
var sass 			= require('gulp-sass')
var sourcemaps 		= require('gulp-sourcemaps')
var handleErrors 	= require('../lib/handleErrors')
var banner 			= require('../lib/banner')
var autoprefixer 	= require('gulp-autoprefixer')
var path 			= require('path')
var header 			= require('gulp-header')
var cssnano 		= require('gulp-cssnano')
var rename 			= require('gulp-rename')

var paths = {
	src: path.join(config.root.src, config.tasks.css.src, '/**/*.{' + config.tasks.css.extensions + '}'),
	dest: path.join(config.root.dest, config.tasks.css.dest)
}

var cssTask = function () {
	var css = gulp.src(paths.src)
		.pipe(sourcemaps.init())
		.pipe(sass(config.tasks.css.sass))
		.on('error', handleErrors)
		.pipe(autoprefixer(config.tasks.css.autoprefixer))
		.pipe(header(banner(config)))

	var compile = css.pipe(sourcemaps.write('./'))

	var minify = css.pipe(clone())
		.pipe(cssnano({autoprefixer: false}))
		.on('error', handleErrors)
		.pipe(rename({
			suffix: ".min"
		}))

	var jobs = []
	jobs.push(compile)

	if ( global.production ) jobs.push(minify)

	return merge(jobs)
		.pipe(gulp.dest(paths.dest))
		.pipe(browserSync.stream())
}

gulp.task('css', cssTask)
module.exports = cssTask
