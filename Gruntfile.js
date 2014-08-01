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
                tasks: ['copy:dev', 'requirejs:dev'],
            }
        },

        copy: {
            dev: {
                files: [{
                    dot: true,
                    expand: true,
                    flatten: true,
                    dest: '<%= config.js %>/',
                    src: [
                        '<%= config.js %>/lib/requirejs/require.js'
                    ]
                }]
            },
            prod: {
                files: [{
                    dot: true,
                    expand: true,
                    flatten: true,
                    dest: '<%= config.js %>/',
                    src: [
                        '<%= config.js %>/lib/requirejs/require.js'
                    ]
                }]
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

        requirejs: {
            dev: {
                options: {
                    name: "main",
                    optimize: 'none',
                    preserveLicenseComments: true,
                    generateSourceMaps: true,
                    removeCombined: true,
                    useStrict: true,
                    baseUrl: '<%= config.js %>/app',
                    mainConfigFile: '<%= config.js %>/require.conf.dev.js',
                    out: '<%= config.js %>/main.min.js',
                    allowSourceOverwrites: true,
                    keepBuildDir: true
                }
            },
            prod: {
                options: {
                    name: "main",
                    optimize: 'uglify',
                    preserveLicenseComments: false,
                    generateSourceMaps: false,
                    removeCombined: true,
                    useStrict: true,
                    baseUrl: '<%= config.js %>/app',
                    mainConfigFile: '<%= config.js %>/prod.js',
                    out: '<%= config.js %>/main.min.js',
                    allowSourceOverwrites: true,
                    keepBuildDir: true
                }
            }
        },

        // uglify: {
        //     dev: {
        //         options: {
        //             mangle: false,
        //             beautify:true
        //         },
        //         files: {
        //             '<%= config.js %>/main.min.js': [
        //                 '<%= config.js %>/lib/**/*.min.js',
        //                 '<%= config.js %>/app/plugins/{,*/}*.js',
        //                 '<%= config.js %>/app/main.js',

        //                 '!<%= config.js %>/lib/**/locales.min.js',
        //                 '!<%= config.js %>/lib/**/moment-with-locales.min.js'
        //             ]
        //         }
        //     },
        //     prod: {
        //         options: {
        //             mangle: true
        //         },
        //         files: {
        //             '<%= config.js %>/main.min.js': [
        //                 '<%= config.js %>/lib/**/*.min.js',
        //                 '<%= config.js %>/app/plugins/{,*/}*.js',
        //                 '<%= config.js %>/app/main.js',

        //                 '!<%= config.js %>/lib/**/locales.min.js',
        //                 '!<%= config.js %>/lib/**/moment-with-locales.min.js'
        //             ]
        //         }
        //     }
        // }

    });



    grunt.registerTask('prod', function (target) {

        grunt.task.run([
            'less:prod',
            'requirejs:prod'
        ]);
    });

};