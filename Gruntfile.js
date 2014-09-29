module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['Gruntfile.js', '{conf,public,tasks,test}/**/*.js', 'app.js', 'index.js', '!public/vendor/**/*.js', '!public/js/vendor.js']
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
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-bump');

    grunt.registerTask('assets', ['vendor', 'concat', 'uglify']);
    grunt.registerTask('release', ['jshint', 'test', 'bump:patch', 'deploy']);
};
