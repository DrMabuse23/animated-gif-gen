/**
 * Created by pascal on 16.08.14.
 */
/*
 * grunt-contrib-uglify
 * http://gruntjs.com/
 *
 * Copyright (c) 2014 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    // Load grunt tasks automatically
//    require('load-grunt-tasks')(grunt);
    var mozjpeg = require('imagemin-mozjpeg');
    require('time-grunt')(grunt);
    // Project configuration.
    grunt.initConfig({
        config:{
          stylepath:''
        },

        sprite        : {
            layout    : {
                expand      : true,
                src         : '.tmp/images/maennle/*_1x.{jpg,gif,png}',
                destImg     : '.tmp/images/layout/maennle_sprite.png',
                destCSS     : 'scss/_maennle.scss',
                'padding'   : 0,
                // OPTIONAL: Specify img options
//                'algorithm' : 'binary-tree',
                'algorithm' : 'left-right',
                // OPTIONAL: Specify settings for engine
                'engineOpts': {
                    'imagemagick': true
                },
                'imgOpts'   : {
                    // Format of the image (inferred from destImg' extension by default) (jpg, png)
                    'format'  : 'png',
                    // phantomjs only: Milliseconds to wait before terminating PhantomJS script
                    'timeout' : 10000
                }

            },
            retina    : {
                expand      : true,
                src         : '.tmp/images/maennle/*_2x.{jpg,gif,png}',
                destImg     : '.tmp/images/layout/maennle_sprite_2x.png',
                destCSS     : 'scss/_maennle_2x.scss',
                'padding'   : 0,
                // OPTIONAL: Specify img options
//                'algorithm' : 'binary-tree',
                'algorithm' : 'left-right',
                // OPTIONAL: Specify settings for engine
                'engineOpts': {
                    'imagemagick': true
                },
                'imgOpts'   : {
                    // Format of the image (inferred from destImg' extension by default) (jpg, png)
                    'format'  : 'png',

                    // gm only: Quality of image


                    // phantomjs only: Milliseconds to wait before terminating PhantomJS script
                    'timeout' : 1000000
                }

            }
        },
        clean: {
            images: ["images/*",'.tmp/*','styles/*']
        },
        retinafy      : {
            default_options : {
                options : {
                    sizes : {
                        '100%'  : { suffix : '_1x',prefix:'maennle_'},
                        '200%'  : { suffix : '_2x' ,prefix:'maennle_'}

                    }
                },
                files   : [
                    {
                        expand : true,
                        cwd    : 'raw_images/maennle/',
                        src    : ['**/*.{jpg,gif,png}'],
                        dest   : '.tmp/images/maennle'
                    }
                ]
            }
        },
        imagemin: {                          // Task
            dynamic: {                         // Another target
               options:{
                   optimizationLevel: 3,
                   use: [mozjpeg()]
               },
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: '.tmp/images/layout',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'images/layout/'                  // Destination path prefix
                }]
            }
        },
        replace: {
            example: {
                src: ['scss/*.scss'],             // source files array (supports minimatch)
                overwrite    : true,
                replacements: [{
                    from: '../.tmp',                   // string replacement
                    to: '..'
                }]
            }
        },
        sass       : {
            dist : {
                files : [
                    {
                        expand : true,
                        cwd    : 'scss',
                        src    : ['*.scss'],
                        dest   : 'styles',
                        ext    : '.css'
                    }
                ]
            }
        }
        });
    // Actually load this plugin's task(s).

    // These plugins provide necessary tasks.

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-image-resize');
    grunt.loadNpmTasks('grunt-retinafy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-text-replace');
    // By default, lint and run all tests.
    grunt.registerTask('default', ['clean','retinafy','sprite','replace','imagemin','sass']);

};