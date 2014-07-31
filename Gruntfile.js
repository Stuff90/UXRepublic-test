/*jshint node:true*/

module.exports = function (grunt) {

    'use strict';

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        config: {
            js     : 'js',
            css    : 'style',
            less   : 'style/less',
        },

        watch: {
            less: {
                files: ['<%= config.less %>/{,*/}*.less'],
                tasks: ['less:dev'],
                options: {
                    spawn: false,
                    reload: true,
                    interrupt: true
                }
            },
            js: {
                files: ['<%= config.js %>/app/{,*/}*.js'],
                tasks: ['uglify:dev'],
            }
        },


        less: {
            dev: {
                files: {
                    '<%= config.css %>/main.min.css': '<%= config.less %>/main.less'
                }
            },
            prod: {
                options: {
                    compress: true
                },
                files: {
                    '<%= config.css %>/main.min.css': '<%= config.less %>/main.less'
                }
            }
        },

        uglify: {
            dev: {
                options: {
                    mangle: false,
                    beautify:true
                },
                files: {
                    '<%= config.js %>/main.min.js': [
                        '<%= config.js %>/lib/**/*.min.js',
                        '<%= config.js %>/app/plugins/{,*/}*.js',
                        '<%= config.js %>/app/main.js',

                        '!<%= config.js %>/lib/**/locales.min.js',
                        '!<%= config.js %>/lib/**/moment-with-locales.min.js'
                    ]
                }
            },
            prod: {
                options: {
                    mangle: true
                },
                files: {
                    '<%= config.js %>/main.min.js': [
                        '<%= config.js %>/lib/**/*.min.js',
                        '<%= config.js %>/app/plugins/{,*/}*.js',
                        '<%= config.js %>/app/main.js',

                        '!<%= config.js %>/lib/**/locales.min.js',
                        '!<%= config.js %>/lib/**/moment-with-locales.min.js'
                    ]
                }
            }
        }

    });



    grunt.registerTask('prod', function (target) {

        grunt.task.run([
            'less:prod',
            'uglify:prod'
        ]);
    });

};