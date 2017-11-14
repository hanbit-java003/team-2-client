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

$('#member-layout').on('click', function () {
    openMemberLayer();
});

function openMemberLayer(memberInfo) {
    $('body').append('<div class="dark-layer"</div>');
    $('body').css('overflow', 'hidden');

    var memberLayer = require('../template/member-login.hbs');
    var memberLayerHtml = memberLayer(memberInfo);

    $('body').append(memberLayer);

    $('.toggle-btn').on('click', function () {
        $('.member-join').toggle();
        $('.member-login').toggle();
    });

    $('.header-sub').animate({
        right: '0px'
    }, {
        duration: 500,
        complete: function () {
            $('#member-join-btn').on('click', function () {
                memberJoin();
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
}


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

function memberJoin() {
    var email = $('#member-join-email').val().trim();
    var password = $('#member-join-password').val().trim();
    var agree = $('#agree').prop('checked');

    if (!email) {
        alert('아이디를 입력하세요');
        $('#member-join-email').focus();
        return;
    }
    else if (!password) {
        alert('비밀번호를 입력하세요');
        $('#member-join-password').focus();
        return;
    }
    else if (!agree) {
        alert('약관에 동의하세요');
        return;
    }

    $.ajax({
        url: '/api/member/signup',
        method: 'POST',
        data: {
            email: email,
            password: password
        },
        success: function (result) {
            alert('가입을 환영합니다');
            closeMemberLayer();
        },
        error: function (jqXHR) {
            alert('안된다');
        }
    });
}