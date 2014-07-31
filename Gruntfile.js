/*jshint node:true*/

module.exports = function (grunt) {

    'use strict';

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        config: {
            src     : 'public',
            assets  : 'assets',
            app     : 'public/js/app',
            less     : 'public/less',
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
            },
            copy: {
                tasks: ['copy:dev'],
                files: '<%= config.app %>/{,*/}*.js'
            },
            js: {
                files: '<%= config.app %>/**',
                tasks: ['requirejs:dev']
            }
        },

        copy: {
            dev: {
                files: [{
                    dot: true,
                    expand: true,
                    flatten: true,
                    dest: '<%= config.assets %>/js/',
                    src: [
                        '<%= config.src %>/js/lib/requirejs/require.js'
                    ]
                },{
                    dot: true,
                    expand: true,
                    flatten:true,
                    dest: '<%= config.assets %>/video',
                    src: [
                        '<%= config.src %>/video/*'
                    ]
                }]
            },
            prod: {
                files: [{
                    dot: true,
                    expand: true,
                    flatten: true,
                    dest: '<%= config.assets %>/js/',
                    src: [
                        '<%= config.src %>/js/lib/requirejs/require.js'
                    ]
                },{
                    dot: true,
                    expand: true,
                    flatten:true,
                    dest: '<%= config.assets %>/video',
                    src: [
                        '<%= config.src %>/video/*'
                    ]
                }]
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
                    baseUrl: '<%= config.app %>',
                    mainConfigFile: '<%= config.src %>/js/dev.js',
                    out: '<%= config.assets %>/js/main.js',
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
                    baseUrl: '<%= config.app %>',
                    mainConfigFile: '<%= config.src %>/js/prod.js',
                    out: '<%= config.assets %>/js/main.js',
                    allowSourceOverwrites: true,
                    keepBuildDir: true
                }
            }
        },

        less: {
            dev: {
                options: {
                    sourceMap: false
                },
                files: {
                    '<%= config.assets %>/css/style.css': '<%= config.less %>/main.less'
                }
            },
            prod: {
                options: {
                    compress: true,
                    report: true
                },
                files: {
                    '<%= config.assets %>/css/style.css': '<%= config.less %>/main.less'
                }
            }
        }

    });

};