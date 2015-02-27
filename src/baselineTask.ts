/// <reference path="../typings/baseline-lib.d.ts" />
/// <reference path="../typings/gruntjs.d.ts" />
/// <reference path="../typings/node.d.ts" />

import Baseline = require("baseline");
import fs = require("fs");
import path = require("path");

function task(grunt: IGrunt) {

    grunt.registerMultiTask('baseline', 'Grunt plugin for benchmarking node.js modules that allows performance to be compared to an established baseline', function() {

        var options = this.options({
        });

        var files: string[] = [];

        // Iterate over all specified file groups.
        this.files.forEach((file: grunt.file.IFileMap) => {
            files = files.concat(file.src);
        });

        var baseline = new Baseline();
        baseline.files = files;

        if(options.threshold !== undefined) {
            baseline.threshold = options.threshold;
        }

        if(options.minTime !== undefined) {
            baseline.maxTime = options.minTime;
        }

        if(options.timeout !== undefined) {
            baseline.timeout = options.timeout;
        }

        if(options.baselinePath !== undefined) {
            baseline.baselinePath = options.baselinePath;
        }

        if(options.updateBaseline !== undefined) {
            baseline.updateBaseline = !!options.updateBaseline;
        }

        if(options.useColors !== undefined) {
            baseline.useColors = !!options.useColors;
        }

        if(options.reporter !== undefined) {
            if(typeof options.reporter !== "string") {
                grunt.log.error("Invalid option 'reporter'. Value must be a string.");
                return;
            }
            // load reporter
            try {
                var Reporter: any;
                switch(options.reporter.toLowerCase()) {
                    case "default":
                        Reporter = Baseline.DefaultReporter;
                        break;
                    case "minimal":
                        Reporter = Baseline.MinimalReporter;
                        break;
                }
            } catch (err) {
                try {
                    Reporter = require(options.reporter);
                } catch (err) {
                    grunt.log.error("Invalid option 'reporter'. The reporter named '" + options.reporter + "' does not exist.");
                    return;
                }
            }
            baseline.reporter = new Reporter(options.reporterOptions);
        }

        var done = this.async();
        baseline.run((err: Error, slower?: number) => {
            if(err) {
                grunt.log.error(err.message);
                grunt.log.error((<any>err).stack);
                done(false);
                return;
            }

            done(slower === 0 || !options.failIfSlower)
        });
    });
}

export = task;

