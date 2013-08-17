'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['Gruntfile.js', 'conf/**/*.js', 'public/**/*.js', 'app.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
};