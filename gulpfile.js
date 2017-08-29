var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

// 启用静态服务器
gulp.task('default',['jsmin','cssmin','htmlmin','imagemin'],function(){

	browserSync.init({
        server: {
            baseDir: "./"
        }
    });

	// 监控文件变化 -> 执行任务 -> 刷新浏览器
	gulp.watch(['src/js/*.js','src/views/**/*.js','src/css/*.css','src/*.html','src/views/**/*.html'],['jsmin','cssmin','htmlmin']).on('change', reload);

});

// js合并压缩
gulp.task('jsmin',function(){

	gulp.src(['src/js/*.js','src/views/**/*.js'])
		.pipe(concat('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));

});

// css压缩
gulp.task('cssmin',function(){

	gulp.src('src/css/*.css')
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('dist/css'))

})

// 图片压缩
gulp.task('imagemin',function(){

	gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))

})

// html压缩
gulp.task('htmlmin',function(){

	gulp.src(['src/*.html',''])
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('dist'))

	gulp.src('src/views/**/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('dist/views'))

})







