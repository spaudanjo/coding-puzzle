var gulp = require("gulp"),
    karma = require("karma").server,
    sass = require("gulp-sass"),
    path = require("path"),
    browserify = require("gulp-browserify"),
    webserver = require("gulp-webserver"),
    eslint = require("gulp-eslint");


var karmaConfFile = path.join(__dirname, "/tests/karma.conf.js");

gulp.task("lint", function () {
    return gulp.src(["js/**/*.js", "tests/**/*.js"])
    // eslint() attaches the lint output to the eslint property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failOnError last.
    .pipe(eslint.failOnError());
});


/**
* Task: `sass`
* Converts SASS files to CSS
*/
gulp.task("sass", function () {
    return gulp.src(["sass/main.scss"])
    // .pipe(plumber({
    //     errorHandler: errorHandler
    // }))
    .pipe(sass({
        sourceComments: "map"
    }))
    // .pipe(autoprefixer())
    // .pipe(plumber.stop())
    .pipe(gulp.dest("css"));
    // .pipe(notify('CSS compiled'))
    // .pipe(livereload())
    ;
});

// Basic usage
gulp.task("build", ["sass", "lint"], function() {
    // Single entry point to browserify
    gulp.src("./js/app.js")
        .pipe(browserify({
          insertGlobals: true,
          debug: !gulp.env.production
        }))
        .pipe(gulp.dest("./build/js"));
});

// Rerun the task when a file changes
gulp.task("watch", function() {
    gulp.watch(["./js/*", "./sass/**/*", "index.html"], ["build"]);
});

gulp.task("webserver", ["lint"], function() {
  gulp.src(".")
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

gulp.task("test", ["lint"], function (done) {
    karma.start({
        configFile: karmaConfFile,
        singleRun: true
    }, done);
});

gulp.task("tdd", ["lint"], function (done) {
    // var browsers = useChromeForKarmaFlag ? ["Chrome"] : ["PhantomJS"];
    karma.start({
        configFile: karmaConfFile,
        autoWatch: true,
        singleRun: false
    }, done);
});

gulp.task("default", ["build", "watch", "webserver"], function(){});
