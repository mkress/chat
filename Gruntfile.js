module.exports = function (grunt) {

    // Load all tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        cssmin: {
            compress: {
                files: {
                    'public/css/min.css': ['src/css/dialog.css', 'src/css/app.css']
                }
            }
        },

        uglify: {
            businessRoutines: {
                files: {
                    'public/js/logic.min.js': ['src/js/validators.js', 'src/js/tools.js']
                }
            }
        },

        jslint: {
            files: ['src/js/*.js']
        },

        copy: {
            main: {
                files: [
                    {
                        src: 'bower_components/jquery/jquery.min.js',
                        dest: 'public/js/jquery.js'
                    },{
                        src: 'bower_components/bootstrap/dist/js/bootstrap.min.js',
                        dest: 'public/js/bootstrap.js'
                    },{
                        cwd: 'bower_components/bootstrap/dist/fonts/',
                        src: 'glyphicons-*',
                        dest: 'public/fonts/',
                        expand: true,
                        flatten: true,
                        filter: 'isFile'
                    }, {
                        cwd: 'bower_components/bootstrap/dist/css/',
                        expand: true,
                        flatten: true,
                        src: '*.min.css',
                        dest: 'public/css/',
                        filter: 'isFile'
                    }
                ]
            }
        },

        clean: ['public/*'],

        less: {
            development: {
                options: {
                    paths: ["public/css"]
                },
                files: {
                    "public/css/chat.css": "less/chat.less"
                }
            }
        }
    });

    grunt.registerTask('default', ['clean', 'less', 'copy']);
};
