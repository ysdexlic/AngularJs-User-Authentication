'use strict';

var baseDir = 'client';

module.exports = {

  //This is the list of file patterns to load into the browser during testing.
  files: [
    baseDir + '/src/vendor/angular/angular.js',
    baseDir + '/src/vendor/angular-mocks/angular-mocks.js',
    baseDir + '/src/vendor/angular-ui-router/release/angular-ui-router.js',
    baseDir + '/src/vendor/lodash/lodash.js',
    baseDir + '/src/vendor/angular-cookies/angular-cookies.js',
    baseDir + '/src/app/**/*.module.js',
    baseDir + '/src/app/**/*.js',
    baseDir + '/src/common/**/*.js',
    'build/tmp/*.js',
    baseDir + '/test/unit/**/*.spec.js'
  ],

  //used framework
  frameworks: ['jasmine', 'sinon'],

  plugins: [
    'karma-chrome-launcher',
    'karma-phantomjs-launcher',
    'karma-jasmine',
    'karma-coverage',
    'karma-html-reporter',
    'karma-osx-reporter',
    'karma-mocha-reporter',
    'karma-sinon'
  ],

  preprocessors: {
    '**/client/src/**/*.js': 'coverage'
  },

  reporters: ['mocha', 'html', 'coverage', 'osx'],

  coverageReporter: {
    type: 'html',
    dir: baseDir + '/test/unit-results/coverage',
    file: 'coverage.html'
  },

  htmlReporter: {
    outputDir: baseDir + '//test/unit-results/html'
  },

  //Other option is to use failOnly
  osxReporter: {
    notificationMode: 'always'
  },

  logLevel: 'info',

  urlRoot: '/__test/',

  //used browsers (overriding in some gulp task)
  browsers: ['PhantomJS']
};
