// Karma configuration
// Generated on Thu May 14 2015 15:06:29 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "",


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["commonjs", "jasmine"],

    // list of files / patterns to load in the browser
    // we don't use it, because we define the files in gulfipe.js
    files: [
      "../js/**/*.js",
      "**/*-test.js"
    ],


    // list of files to exclude
    exclude: [
        "../js/app.js",
        "../js/vendor/**/*.js",
        "karma.conf.js"
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        "../js/**/*.js": ["commonjs", "coverage"],
        "**/*-test.js": ["commonjs"]
    },

    // test results reporter to use
    // possible values: "dots", "progress"
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["progress", "coverage"],



    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ["Chrome"],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    coverageReporter: {
        reporters: [
            {
                type: "text"
            },
            {
                type: "lcov",
                dir: "test/coverage/",
                file: "lcov.info"
            }
        ]
    }
  });
};
