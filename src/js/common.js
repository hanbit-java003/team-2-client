require('bootstrap');

$('.header-menu-name').on('click', function () {
    var id = $(this).attr('id');

    location.href = '/' + id + '.html';
});


$('#index').on('click', function () {
    location.href = '/index.html';
});


/*$('#member-layout').on('click', function () {
   var memberLayer = require('../template/member-login.hbs');

    $('body').append(memberLayer);

    $('.header-sub').animate({
        right: '0px'
    }, {
        duration: 500,
        complete: function () {
            $('.header-sub').remove();
            $('body').css('overflow', 'auto');
        }
    });
});*/

