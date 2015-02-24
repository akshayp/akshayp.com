'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        eslint: {
            options: {
                quiet: true
            },
            target: ['**/*.js', '!public/vendor/**/*.js', '!public/js/vendor.js']
        },
        vendor: {
            pure: 'http://yui.yahooapis.com/pure/0.5.0/pure-min.css',
            html5shiv: 'http://html5shiv.googlecode.com/svn/trunk/html5.js',
            rainbow: [
                'https://raw.github.com/ccampbell/rainbow/master/js/rainbow.js',
                'https://raw.github.com/ccampbell/rainbow/master/js/language/generic.js',
                'https://raw.github.com/ccampbell/rainbow/master/js/language/javascript.js',
                'https://raw.github.com/ccampbell/rainbow/master/js/language/css.js',
                'https://raw.github.com/ccampbell/rainbow/master/js/language/html.js',
                'https://raw.github.com/ccampbell/rainbow/master/js/language/shell.js'
            ]
        },
        concat: {
            js: {
                src: ['public/vendor/rainbow/rainbow.js', 'public/vendor/**/*.js'],
                dest: 'public/js/vendor.js'
            },
            css: {
                src: ['public/vendor/**/*.css'],
                dest: 'public/css/vendor.css'
            }
        },
        uglify: {
            js: {
                files: {
                    'public/js/vendor.js': ['public/js/vendor.js']
                }
            }
        },
        bump: {
            options: {
                commitMessage: 'Release v%VERSION%',
                createTag: false,
                gitDescribeOptions: '--always --abbrev=1 --dirty=-d'
            }
        }
    });

    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-bump');

    grunt.registerTask('assets', ['vendor', 'concat', 'uglify']);
    grunt.registerTask('release', ['eslint', 'test', 'bump:patch']);
};
