require('./common');
require('bootstrap');
require('../less/community.less');

$('.community').on('click', function () {
    var id = $(this).attr('id');

    location.href = '/' + id + '.html';
});