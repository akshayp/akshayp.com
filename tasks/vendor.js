'use strict';

const request = require('request');
const fs = require('fs');
const url = require('url');
const traverse = require('traverse');

module.exports = function (grunt) {
    grunt.registerTask('vendor', 'Grab latest vendor files', function () {
        const opts = grunt.config.get('vendor');
        const done = this.async();
        const keys = Object.keys(opts);
        let numDone = 0;

        const assets = traverse(opts).reduce(function (acc, x) {
            if (this.isLeaf) {
                acc.push(x);
            }

            return acc;
        }, []);

        const length = assets.length;

        function onReqDone () {
            numDone = numDone + 1;

            if (length === numDone) {
                done();
            }
        }

        function getFileName (file, lib) {
            const path = url.parse(file).path.split('/');
            const filename = path[path.length - 1];
            const dirpath = './public/vendor/' + lib;
            const filepath = dirpath + '/' + filename;

            grunt.file.mkdir(dirpath);

            return filepath;
        }

        function fetchAsset (file, lib) {
            const filepath = getFileName(file, lib);
            const req = request(file, grunt.log.writeln('Fetching: ' + file)).pipe(fs.createWriteStream(filepath));
            req.on('finish', onReqDone);
        }

        keys.forEach(function (key) {
            const val = opts[key];

            if (val instanceof Array) {
                val.forEach(function (file) {
                    fetchAsset(file, key);
                });
            } else {
                fetchAsset(val, key);
            }
        });
    });
};
