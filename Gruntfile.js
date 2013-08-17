'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['Gruntfile.js', '{conf,public,tasks}/**/*.js', 'app.js', '!public/vendor/**/*.js']
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'public/img/upload',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'public/img/upload'
                }]
            }
        },
        vendor: {
            pure: 'http://yui.yahooapis.com/pure/0.2.1/pure-min.css',
            html5shiv: 'http://html5shiv.googlecode.com/svn/trunk/html5.js',
            prettify: 'http://google-code-prettify.googlecode.com/svn/trunk/src/prettify.js'
        }
    });

    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
};