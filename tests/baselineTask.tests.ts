/// <reference path="../typings/node.d.ts"/>
/// <reference path="../typings/mocha.d.ts"/>
/// <reference path="../typings/chai.d.ts"/>

import chai = require("chai");
import assert = chai.assert;
import childProcess = require("child_process");

var fixturesDir = "tests/fixtures/";

describe('Baseline Task', () => {

    it("executes the test suite", function(done) {
        this.timeout(4000);
        runFixture("simple", (err, output) => {
            if(err) return done(err);
            assert.include(output, "Completed 1 tests");
            done();
        });
    });

    it("compares results to baseline when 'baselinePath' options is provided", function(done) {
        this.timeout(4000);
        runFixture("baselinePath", (err, output) => {
            if(err) return done(err);
            assert.include(output, "1 slower");
            assert.include(output, "Done, without errors");
            done();
        });
    });

    it("aborts grunt if tests are slower than baseline and 'failIfSlower' option is 'true'", function(done) {
        this.timeout(4000);
        runFixture("failIfSlower", (err, output) => {
            assert.instanceOf(err, Error);
            assert.include(output, "Aborted due to warnings");
            done();
        });
    });

    it("does not abort grunt if tests are not slower than baseline and 'failIfSlower' option is 'true'", function(done) {
        this.timeout(4000);
        runFixture("failIfSlowerNoBaseline", (err, output) => {
            if(err) return done(err);
            assert.notInclude(output, "1 slower");
            assert.include(output, "Done, without errors");
            done();
        });
    });

    it("correctly loads minimal reporter", function(done) {
        this.timeout(4000);
        runFixture("minimalReporter", (err, output) => {
            if(err) return done(err);
            assert.notInclude(output, "\xb1");
            assert.include(output, "Completed 1 tests");
            done();
        });
    });
});

function runFixture(name: string, callback: (err: Error, output?: string) => void): void {

    childProcess.exec("grunt --fixture=" + name, { cwd: fixturesDir }, (err: Error, stdout: Buffer) => {
        callback(err, stdout.toString('utf8'));
    });
}