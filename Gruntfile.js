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
                },
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
            prod: {
                options: {
                    mangle: true
                },
                files: {
                    '<%= config.js %>/main.min.js': [
                        '<%= config.js %>/plugins/{,*/}*.js',
                        '<%= config.js %>/main.js'
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