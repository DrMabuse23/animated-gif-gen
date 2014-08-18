/**
 * Created by pascal on 17.08.14.
 */
var rimraf = require('gulp-rimraf');

gulp.task('clean', function() {
    return gulp.src('../.tmp', { read: false })
            .src('../images', { read: false })
            .src('../styles', { read: false })
        .pipe(rimraf({ force: true }));
});