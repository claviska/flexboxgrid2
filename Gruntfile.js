/*global module:false*/

module.exports = function(grunt) {
  grunt.initConfig({
    myth: {
      compile: {
        expand: true,
        cwd: "css",
        src: ["*.css", "!*.min.css"],
        dest: "css",
        ext: ".css"
      },
      release: {
        files: {
          "dist/flexboxgrid.css": "src/flexboxgrid.css"
        }
      }
    },
    cssmin: {
      concat: {
        files: {
          "docs/style.css": [
            "node_modules/normalize.css/normalize.css",
            "docs/src/style.css",
            "dist/flexboxgrid.css"
          ]
        }
      },
      minify: {
        expand: true,
        cwd: "css",
        src: ["*.css", "!*.min.css"],
        dest: "css",
        ext: ".min.css"
      },
      release: {
        expand: true,
        cwd: "dist",
        src: ["*.css", "!*.min.css"],
        dest: "dist",
        ext: ".min.css"
      }
    },
    processhtml: {
      dist: {
        options: {
          process: true
        },
        files: {
          "docs/index.html": ["docs/src/index.html"]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          "docs/index.html": ["docs/index.html"]
        }
      }
    },
    watch: {
      css: {
        files: "src/**/*",
        tasks: ["default"]
      },
      livereload: {
        options: {
          livereload: true
        },
        files: ["index.html", "css/*.css", "js/*.js", "img/*"]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks("grunt-myth");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-processhtml");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");

  // Default task.
  grunt.registerTask("default", [
    "myth",
    "cssmin:concat",
    "cssmin:minify",
    "cssmin:release",
    "processhtml",
    "htmlmin"
  ]);
  grunt.registerTask("watch", ["watch"]);
};
