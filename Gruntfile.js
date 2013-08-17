module.exports = function (grunt) {
    'use strict';
    
    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js', 'conf/**/*.js', 'public/**/*.js', 'app.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
};