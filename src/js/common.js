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

function memberLogin() {
    var email = $('#member-email').val().trim();
    var password = $('#member-password').val().trim();

    if (!email) {
        alert('아이디를 입력하세요');
        $('#member-email').focus();
    }

    else if (!password) {
        alert('비밀번호를 입력하세요');
        $('#member-password').focus();
    }
}

function memberJoin() {
    var email = $('#member-join-email').val().trim();
    var pw = $('#member-join-password').val().trim();
    var agree = $('#agree').prop('checked');

    if(!email) {
        alert('아이디를 입력하세요');
        $('#member-email').focus();
    }
    else if (!pw) {
        alert('비밀번호를 입력하세요');
        $('#member-password').focus();
    }
    else if (!agree) {
        alert('약관에 동의하세요');
    }
}