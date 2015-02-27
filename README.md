[![Build Status](https://travis-ci.org/artifacthealth/grunt-baseline.svg?branch=master)](https://travis-ci.org/artifacthealth/grunt-baseline)

# grunt-baseline

> Grunt plugin for benchmarking node.js modules that allows performance to be compared to an established baseline.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-baseline --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-baseline');
```

## The "baseline" task

This is a Grunt plugin for [Baseline](https://github.com/artifacthealth/baseline), a benchmarking framework
for [node.js](http://nodejs.org/).

Baseline allow the results of a test run to be saved and used to determine if performance changes in the future.
Alternatively, tests can be compared against each other. Baseline supports both synchronous and asynchronous
tests using a simple syntax. For more information see the [documentation](https://github.com/artifacthealth/baseline).

### Overview
In your project's Gruntfile, add a section named `baseline` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  baseline: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    }
  }
});
```

### Options

#### threshold
Type: `number`
Default value: `10`

The minimum percent difference from baseline that is reported as a change.

#### minTime
Type: `number`
Default value: `2`

The minimum time a test runs in seconds

#### timeout
Type: `number`
Default value: `6000`

Maximum execution time for an asynchronous action, in milliseconds.

#### baselinePath
Type: `string`

Full path to file to use for saved baseline.

#### updateBaseline
Type: `boolean`
Default value: `false`

Indicates whether or not the saved baseline file should be updated.

#### useColors
Type: `boolean`

Indicates whether or not to use colors in reporter. If undefined, colors are used if supported in the terminal.

#### reporter
Type: `string`
Default value: `default`

See [Baseline documentation](https://github.com/artifacthealth/baseline) for information on available reporters.

If a value is not a built-in reporter, the task tries to a load a CommonJS module with the specified name and use that
module as the reporter.

#### failIfSlower
Type: `boolean`
Default value: `false`

Fails the build script if any tests are slower than the baseline.


### Usage Examples

#### Run tests for all files matching *.bench.js.

```js
grunt.initConfig({
    baseline: {
        tests: {
            src: [
                "**/*.bench.js"
            ]
        }
    }
});
```

#### Run tests using the minimal reporter.

```js
grunt.initConfig({
    baseline: {
        tests: {
            options: {
                reporter: 'minimal'
            },
            src: [
                "**/*.bench.js"
            ]
        }
    }
});
```

#### Fail the build script if any tests are slower than the baseline contained in 'baseline.json'.

```js
grunt.initConfig({
    baseline: {
        tests: {
            options: {
                baselinePath: 'baseline.json',
                failIfSlower: true
            },
            src: [
                "**/*.bench.js"
            ]
        }
    }
});
```



