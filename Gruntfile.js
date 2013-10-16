module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

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
        },

        watch: {
            files: ['src/js/*.js'],
            tasks: ['jslint']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-jslint');

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.loadNpmTasks('grunt-contrib-watch');

    //grunt.registerTask('default', ['cssmin', 'uglify', 'jslint']);
    grunt.registerTask('default', ['clean', 'less', 'copy']);
};
