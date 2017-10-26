require('bootstrap');

$('.header-menu-name').on('click', function () {
    var id = $(this).attr('id');

    location.href = '/' + id + '.html';
});


$('#index').on('click', function () {
    location.href = '/index.html';
});


$('#member-layout').on('click', function () {
    $('body').append('<div class="dark-layer"</div>');
    $('body').css('overflow', 'hidden');

    var memberLayer = require('../member-login.hbs');

    $('body').append(memberLayer);

    $('.header-sub').animate({
        right: '0px'
    }, {
        duration: 500,
        complete: function () {
            $('.dark-layer').on('click', function () {
                $('.header-sub').anmiate({
                    right: '-400px'
                }, {
                    duration: 500,
                    complete: function () {
                        $('.header-sub').remove();
                        $('.dark-layer').remove();
                        $('body').css('overflow', 'auto');
                    }
                });
            });
        }
    });

});


