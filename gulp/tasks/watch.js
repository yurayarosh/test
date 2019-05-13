var gulp   = require('gulp');
var config = require('../config');

gulp.task('watch', 
    ['copy:watch',
    'nunjucks:watch',
    'sprite:png:watch',
    'svgo:watch',
    'svgicons:watch',
    'list-pages:watch',
    'webpack:watch',
    'sass:watch'
]);
