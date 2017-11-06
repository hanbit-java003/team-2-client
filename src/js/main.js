require('bootstrap');
require('../less/mainindex.less');

$('.contackus').on('click', function () {
    var id = $(this).attr('id');

    location.href = '/' + id + '.html';
});

function fadeIn() {
    $('.main-logo').fadeIn(250);
}

fadeIn();