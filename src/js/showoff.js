require('./common');
require('bootstrap');
require('../less/showoff.less');

$('.goto-main').on('click', function() {
    location.href = 'index.html';
});
