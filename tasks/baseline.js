/*! *****************************************************************************
 Copyright (c) 2014 Artifact Health, LLC. All rights reserved.

 Permission is hereby granted, free of charge, to any person
 obtaining a copy of this software and associated documentation
 files (the "Software"), to deal in the Software without
 restriction, including without limitation the rights to use,
 copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following
 conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.
 ***************************************************************************** */

/// <reference path="../typings/baseline-lib.d.ts" />
/// <reference path="../typings/gruntjs.d.ts" />
/// <reference path="../typings/node.d.ts" />
var Baseline = require("baseline");
function task(grunt) {
    grunt.registerMultiTask('baseline', 'Grunt plugin for benchmarking node.js modules that allows performance to be compared to an established baseline', function () {
        var options = this.options({});
        var files = [];
        // Iterate over all specified file groups.
        this.files.forEach(function (file) {
            files = files.concat(file.src);
        });
        var baseline = new Baseline();
        baseline.files = files;
        if (options.threshold !== undefined) {
            baseline.threshold = options.threshold;
        }
        if (options.maxTime !== undefined) {
            baseline.maxTime = options.maxTime;
        }
        if (options.timeout !== undefined) {
            baseline.timeout = options.timeout;
        }
        if (options.baselinePath !== undefined) {
            baseline.baselinePath = options.baselinePath;
        }
        if (options.updateBaseline !== undefined) {
            baseline.updateBaseline = !!options.updateBaseline;
        }
        if (options.useColors !== undefined) {
            baseline.useColors = !!options.useColors;
        }
        if (options.reporter !== undefined) {
            if (typeof options.reporter !== "string") {
                grunt.log.error("Invalid option 'reporter'. Value must be a string.");
                return;
            }
            try {
                var Reporter;
                switch (options.reporter) {
                    case "default":
                        Reporter = Baseline.DefaultReporter;
                        break;
                    case "minimal":
                        Reporter = Baseline.MinimalReporter;
                        break;
                }
            }
            catch (err) {
                try {
                    Reporter = require(options.reporter);
                }
                catch (err) {
                    grunt.log.error("Invalid option 'reporter'. The reporter named '" + options.reporter + "' does not exist.");
                    return;
                }
            }
            baseline.reporter = new Reporter(options.reporterOptions);
        }
        var done = this.async();
        baseline.run(function (err, slower) {
            if (err) {
                grunt.log.error(err.message);
                grunt.log.error(err.stack);
                done(false);
                return;
            }
            done(slower === 0 || !options.failIfSlower);
        });
    });
}
module.exports = task;
