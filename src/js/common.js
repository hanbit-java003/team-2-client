require('bootstrap');

$('.header-menu-name').on('click', function () {
    var id = $(this).attr('id');

    location.href = '/' + id + '.html';
});

$('#index').on('click', function () {
    location.href = '/index.html';
});

