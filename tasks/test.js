module.exports = function (grunt) {

    grunt.registerTask('test', 'run mocha-test', function () {
        var done = this.async();
        require('child_process').exec('./node_modules/istanbul/lib/cli.js cover --print summary ./node_modules/mocha/bin/_mocha -- -R spec', function (err, stdout) {
            grunt.log.write(stdout);
            done(err);
        });
    });
};
