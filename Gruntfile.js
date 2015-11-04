/**
 * Created by lance.zhao 2015.05.05
 */
module.exports = function (grunt) {
  //代替 grunt.loadNpmTasks 任务。
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  // 项目配置
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    js: {
      libPath: 'js/thrd_lib/',
      buildPath: 'js/app/',
      jsPath:'js/'
    },
    bower: {
      install: {
        options: {
          targetDir: './js/thrd_lib',
          layout: 'byComponent',
          install: true,
          verbose: false,
          cleanTargetDir: false,
          cleanBowerDir: false,
          bowerOptions: {}
        }
      }
    },
    // Copy files before usemin
    copy: {

      html: {
        expand: true,
        src: [
          'index-dev.html',
          '<%= js.jsPath %>main-dev.js'
        ],
        dest: '',
        rename: function (dest, src) {
          return dest + src.replace(/-dev/, '');
        }
      },
      'template': {
        "files": [
          {
            "expand": true,
            "cwd": "./js/templates",
            "src": ["**/*.html"],
            "dest": "./js/app/templates"
          }
        ]
      }
    },
    // Minify js files for distribution
    useminPrepare: {

      html: [
        'index-dev.html'
      ],
      options: {
        dest: ''
      }
    },

    usemin: {
      html: [
        'index.html'
      ],
      options: {
        assetsDirs: 'js/app'
      }
    },
    // Static (bower lib + modules): lib.min.js
    // Dynamic (singles): singles/*.min.js
    uglify: {

      libs: {
        "options": {
          "report": "false",
          "mangle": {
            "except": ['$super']
          }
        },
        files: [
          {
            src: [
              '<%= js.libPath %>requirejs/require.js',
              '<%= js.libPath %>zepto/zepto.js',
              '<%= js.libPath %>underscore/underscore.js',
              '<%= js.libPath %>underscore/underscore.extend.js',
              '<%= js.libPath %>zepto/fastclick.js',
              '<%= js.libPath %>zepto/when.js'
            ],
            dest: '<%= js.buildPath %>lib/lib.min.js'
          }
        ]
      },
      highCharts: {
        "options": {
          "report": "false",
          "mangle": {
            "except": ['$super']
          }
        },
        files: [
          {
            src: [
              '<%= js.libPath %>Highcharts/zepto-adapter.src.js',
              '<%= js.libPath %>Highcharts/highcharts.src.js'
            ],
            dest: '<%= js.buildPath %>lib/highCharts.min.js'
          }
        ]
      },
      'Views':{
        "options": {
          "report": "false",
          "mangle": {
            "except": ['$super']
          }
        },
        "files": [
          {
            "expand": true,
            "cwd": "./js/views",
            "src": ["**/*.js"],
            "dest": "./js/app/views"
          }
        ]
      }
//      'thrd_lib':{
//        "options": {
//          "report": "false",
//          "mangle": {
//            "except": ['$super']
//          }
//        },
//        "files": [
//          {
//            "expand": true,
//            "cwd": "./js/thrd_lib",
//            "src": ["**/*.js"],
//            "dest": "./js/app/thrd_lib"
//          }
//        ]
//      },
//      'mvc':{
//        "options": {
//          "report": "false",
//          "mangle": {
//            "except": ['$super']
//          }
//        },
//        "files": [
//          {
//            "expand": true,
//            "cwd": "./js/mvc",
//            "src": ["**/*.js"],
//            "dest": "./js/app/mvc"
//          }
//        ]
//      },
//      'ui':{
//        "options": {
//          "report": "false",
//          "mangle": {
//            "except": ['$super']
//          }
//        },
//        "files": [
//          {
//            "expand": true,
//            "cwd": "./js/ui",
//            "src": ["**/*.js"],
//            "dest": "./js/app/ui"
//          }
//        ]
//      }
    },
    // Less2CSS
    less: {

      options: {
        compress: true
      },

      static_mappings: {
        files: [
          {
            expand: true,
            cwd: 'less/',
            src: ['*.less', '!_common.less'],
            dest: 'css/',
            ext: '.min.css'
          }
        ]
      },

      dynamic_mappings: {
        files: [
          {
            expand: true,
            cwd: 'less/singles/',
            src: ['*.less'],
            dest: 'css/',
            ext: '.min.css'
          }
        ]
      }
    },

    replace: {
      dist: {
        options: {
          patterns: [
            {
              match: /\/([^/]+\.js(?!on))([^"]+)?"/g,
              replacement: '/' + '$1' + '?' + Math.floor(new Date().valueOf() / 1000 / 60 / 60 / 24) + '"'
            },
            {
              match: /\/([^/]+\.css)([^"]+)?"/g,
              replacement: '/' + '$1' + '?' + Math.floor(new Date().valueOf() / 1000 / 60 / 60 / 24) + '"'
            }
          ]
        },

        files: [
          {
            src: [
              'index.html'
            ],
            dest: './'
          }
        ]
      }

//      css: {
//        options: {
//          patterns: [
//            {
//              match: /([^/]+\.(?:png|jpg|jpeg))/g,
//              replacement: '$1' + '?' + new Date().valueOf()
//            }
//          ]
//        },
//
//        files: [
//          {
//            src: [
//              'css/base.min.css'
//            ],
//            dest: './'
//          }
//        ]
//      }
    },


    // Watch .js (uglify) and .less (to css) files
    watch: {
      css: {
        files: ['less/**/*'],
        tasks: ['less']
      }
    },
    clean: {
      options: { force: true },
      main: '<%= js.buildPath %>',
      ui_template :'<%= js.buildPath %>/templates/ui/'
    },
    strip: {
      "main": {
        "src": "<%= js.buildPath %>**/*.js",
        "options": {
          "inline": true
        }
      }
    }
  });

  grunt.registerTask('default','bulid_main',function(){
    var cfg = grunt.file.readJSON('gruntcfg.json');
    grunt.config.set('requirejs', { main: cfg.requirejs });

    grunt.task.run(['clean:main','bower','copy','uglify','less','requirejs','useminPrepare','usemin','strip','replace','clean:ui_template']);
  });
};
