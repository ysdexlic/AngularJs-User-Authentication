# [AngularJs-User-Authentication](http://ysdexlic.github.io/AngularJs-User-Authentication/)

[![Build Status](https://secure.travis-ci.org/ysdexlic/AngularJs-User-Authentication.svg)](http://travis-ci.org/ysdexlic/AngularJs-User-Authentication)
[![Dev dependency status](https://david-dm.org/ysdexlic/AngularJs-User-Authentication/dev-status.png)](https://david-dm.org/ysdexlic/AngularJs-User-Authentication#info=devDependencies "Dependency status")
[![Coverage Status](https://coveralls.io/repos/github/ysdexlic/AngularJs-User-Authentication/badge.svg?branch=master)](https://coveralls.io/github/ysdexlic/AngularJs-User-Authentication?branch=master)
***
#### See a [working demo](http://ysdexlic.github.io/AngularJs-User-Authentication/).

### What is it?

AngularJs-Login-Authentication is an example of how to control and authenticate users using a REST API with AngularJS.
This particular example uses [Parse](https://parse.com).

If you wish to use a different REST API, you can swap your API keys and urls by substituting the constants [here](https://github.com/ysdexlic/AngularJs-User-Authentication/blob/master/client/src/common/services/api.module.js).

### Getting started

Make sure you have already installed **node.js**, **gulp** and **bower**

After that, install AngularJs-User-Authentication by cloning the master branch.

From the command line cd into the new directory, then install bower and npm dependencies.

    $ npm install
    $ bower install
    
If you wish to run the application in developer mode then enter:

    $ gulp serve

Or if you wish to run it in the test-driven-development mode, enter:

    $ gulp serve:tdd

The application will now be available at **http://127.0.0.1:3000**.

**When serving, every file you edit in the `/client` folder will refresh all browsers and re-run tests**.

### Features

* [Parse](https://Parse.com) Rest API user service.
* `Unit` and `e2e` testing support.

### Directory Structure

* `build/` - Build and configuration.
* `client/` - Source code and tests, module structure based on angular-styleguides by [Todd Motto](https://github.com/toddmotto/angular-styleguide) and [John Papa](https://github.com/johnpapa/angular-styleguide). 
* `.bowerrc` - Bower configuration.
* `.jshintrc` - JSHint configuration.
* `gulpfile` - see [Build](#Build) below.
* `bower.json` - Bower dependencies.
* `package.json` - node.js dependencies.

### <a name="Build"></a>Build

Every available Gulp task:

* **gulp serve** - The build will watch all files in the `/client` folder. With every change you make to a file, the build will recompile every file and your browser will reload.
* **gulp serve:dist** - This task will run jshint and unit tests and create a distribution build of your application in `build/dist/`. This will minify and compress js and css files, optimize images, and put every template into a js file.
A code coverage report, generated using [istanbul](https://github.com/gotwarlost/istanbul) will be available inside the `client/test/unit-results`.
* **gulp serve:tdd** - Unit testing environment with functionality of `gulp serve`.
* **gulp test:unit** - For running unit tests once.
* **gulp test:e2e** - Run end-to-end tests with `protractor`.
