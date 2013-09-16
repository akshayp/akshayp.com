'use strict';

module.exports = function (grunt) {

    grunt.registerTask('test', 'run mocha-test', function () {
        var done = this.async();
        require('child_process').exec('istanbul cover --print summary _mocha -- -R spec', function (err, stdout) {
            grunt.log.write(stdout);
            done(err);
        });
    });

    grunt.registerTask('deploy', 'run jitsu deploy', function () {
        var done = this.async();
        require('child_process').exec('jitsu deploy', function (err, stdout) {
            grunt.log.write(stdout);
            done(err);
        });
    });
};