require('bootstrap');
require('../less/common.less');

function window() {
    $('.main-window').fadeIn(400);
}

window();

$('.header-menu-name').on('click', function () {
    var id = $(this).attr('id');
    location.href = '/' + id + '.html';
});

$('#index').on('click', function () {
    location.href = '/index.html';
});

/*var memberLayer = require('../template/member-login.hbs');

$('body').append(memberLayer);*/

$('#member-layout').on('click', function () {
    $('body').append('<div class="dark-layer"</div>');
    $('body').css('overflow', 'hidden');

    var memberLayer = require('../template/member-login.hbs');

    $('body').append(memberLayer);

    $('.header-sub').animate({
        right: '0px'
    }, {
        duration: 500,
        complete: function () {
            $('.toggle-btn').on('click', function () {
                $('.member-join').toggle();
                $('.member-login').toggle();
            });

            $('.sign-up-sns-btns > li').on('click', function () {
                var snsBtn = $(this);
                joinUp(snsBtn);
            });

            $('.dark-layer').on('click', function () {
                closeMemberLayer();
            });
            
            $('body').on('keydown', function (event) {
                if (event.keyCode === 27) {
                    closeMemberLayer();
                }
            });
        }
    });
});

function joinUp(snsBtn) {
    var snsConfirm = $('.join-confirm-tab > li');

    var tabIndex = $(snsBtn).index();

    snsConfirm.removeClass('active');
    $(snsConfirm[tabIndex+1]).addClass('active');
}

function closeMemberLayer() {
    $('.header-sub').animate({
        right: '-400px'
    }, {
        duration: 500,
        complete: function () {
            $('.header-sub').remove();
            $('.dark-layer').remove();
            $('body').css('overflow', 'auto');
        }
    });
}