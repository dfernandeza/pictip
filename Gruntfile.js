module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! Pictip - v<%= pkg.version %> @dfernandeza */\n'
			},
			build: {
				src: 'js/jquery.<%= pkg.name %>.js',
				dest: 'js/jquery.<%= pkg.name %>.min.js'
			}
		},
		qunit: {
			all: ['tests/*.html']
		},
		jshint: {
			gruntfile: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: 'Gruntfile.js'
			},
			src: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: ['js/jquery.pictip.js', 'js/main.js']
			}
		}
	});

	// Load the plugins that provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default task(s).
	grunt.registerTask('default', ['jshint', 'qunit', 'uglify']);
};