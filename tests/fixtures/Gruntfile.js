module.exports = function(grunt) {

    grunt.loadTasks("../../tasks/");

    var config = grunt.file.readJSON("../fixtures/" + grunt.option('fixture') + ".json");
    grunt.initConfig(config);

    grunt.registerTask("default", [ "baseline" ]);
}