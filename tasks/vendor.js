'use strict';

module.exports = function (grunt) {
    /*jshint unused: false */
    grunt.registerTask('vendor', 'Grab latest vendor files', function () {
        var opts = grunt.config.get('vendor'),
            request = require('request'),
            fs = require('fs'),
            url = require('url'),
            done = this.async();

        Object.keys(opts).forEach(function (key) {
            var val = opts[key],
                path = url.parse(val).path.split('/'),
                filename = path[path.length - 1],
                dirpath = './public/vendor/' + key,
                filepath = dirpath + '/' + filename;

            grunt.file.mkdir(dirpath);
            request(val, grunt.log.writeln('Fetching: ' + val)).pipe(fs.createWriteStream(filepath));
        });
    });
};