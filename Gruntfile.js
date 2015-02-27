module.exports = function(grunt) {

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-typescript");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-mocha-test");

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        clean: {
            build: {
                src: [
                    "build/"
                ]
            },
            tasks: {
                src: [
                    "tasks/"
                ]
            }
        },

        typescript: {
            build: {
                options: {
                    target: 'es5',
                    module: 'commonjs',
                    sourceMap: true,
                    noImplicitAny: true,
                    basePath: 'src'
                },
                src: [
                    'src/**/*.ts'
                ],
                dest: 'build/'
            },
            tests: {
                options: {
                    target: 'es5',
                    module: 'commonjs',
                    sourceMap: true,
                    noImplicitAny: true,
                    basePath: 'tests'
                },
                src: [
                    'tests/**/*.ts'
                ],
                dest: 'build/'
            }
        },

        concat: {
            tasks: {
                options: {
                    banner: grunt.file.read("COPYRIGHT.txt"),
                    process: function (content, srcpath) {
                        // Remove source map from release file
                        return content.replace("//# sourceMappingURL=baselineTask.js.map","");
                    }
                },
                src: 'build/baselineTask.js',
                dest: 'tasks/baseline.js'
            }
        },

        mochaTest: {
            tests: {
                options: {
                    reporter: 'spec'
                },
                src: [
                    'build/**/*.tests.js'
                ]
            }
        }
    });

    // Default task(s).
    grunt.registerTask("default", [ "build", "tasks", "tests" ]);
    grunt.registerTask("build", [ "clean:build", "typescript:build" ]);
    grunt.registerTask("tasks", [ "clean:tasks", "concat:tasks" ]);
    grunt.registerTask("tests", [ "typescript:tests", "mochaTest:tests" ]);
};