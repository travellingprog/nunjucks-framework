'use strict';

var gulp = require('gulp');

gulp.task('default', ['clean', 'html']);

gulp.task('clean', function () {
	var del = require('del');
	return del.sync(['dist/**/*']);
});

gulp.task('html', function () {
	var fm = require('gulp-front-matter'),
		nunjucksRender = require('gulp-nunjucks-render'),
		rename = require('gulp-rename');

	nunjucksRender.nunjucks.configure(['src/markup/partials/'], {watch: false});

	return gulp
		.src('src/markup/pages/**/*.nunjucks')
		.pipe(fm())
		.pipe(nunjucksRender())
		.pipe(rename(function (path) {
			var dirNameArray = path.dirname.split('/');
			path.dirname = dirNameArray.slice(1).join('/');
			path.extname = '.html';
			return path;
		}))
		.pipe(gulp.dest('./dist/'));
});
