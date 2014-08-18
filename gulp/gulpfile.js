/**
 * Created by pascal on 17.08.14.
 */
var gulp = require('gulp');

gulp.task('default', ['clean','suffix'],function() {
    // place code for your default task here
    console.log('default started');

});

var rimraf = require('gulp-rimraf');

gulp.task('clean', function() {
    return gulp.src(['../.tmp/*','../styles/*','../images/*'], { read: false })
        .pipe(rimraf({ force: true }));
});

var imageResize = require('gulp-image-resize');
gulp.task('convert_png', function () {
    return gulp.src('../raw_images/maennle/*.png')
        .pipe(imageResize({ upscale:true,width:50, format : 'png' }))
        .pipe(gulp.dest('images/maennle/'));
});
var rename = require('gulp-rename');
gulp.task("suffix", function () {

    gulp.src("../raw_images/maennle/*.png")
        .pipe(imageResize({ upscale:true,width:50, format : 'png' }))
        .pipe(rename(function (path) {
            path.basename = "maennle_" + path.basename +'_2x';
            console.log(path.basename);
        }))
        .pipe(gulp.dest("../images/maennle/2x/"));

    gulp.src("../raw_images/maennle/*.png")
        .pipe(imageResize({ upscale:true,width:25, format : 'png' }))
        .pipe(rename(function (path) {

            console.log(path);
            path.basename = "maennle_" + path.basename;
            console.log(path.basename);
        }))
        .pipe(gulp.dest("../images/maennle/"));
});