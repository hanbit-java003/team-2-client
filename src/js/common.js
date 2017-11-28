require('bootstrap');
require('../less/common.less');
var scriptjs = require('scriptjs');

function kakao() {
    Kakao.init('2b2365a9407bbc5d15ceb4862f8ac6cc');
    Kakao.Auth.login({
        success: function(authObj) {
            Kakao.API.request({
                url: '/v1/user/me',
                success: function (res) {
                    alert(res.properties.nickname + ' 님, 어서오세요');
                    snsLogIn(res);
                }
            });
        },
        fail: function(err) {
            alert(JSON.stringify(err));
        }
    });
}

/*function naver() {
    var express = require('express');
    var app = express();
    var client_id = 'YOUR_CLIENT_ID';
    var client_secret = 'YOUR_CLIENT_SECRET';
    var state = "RAMDOM_STATE";
    var redirectURI = encodeURI("YOUR_CALLBACK_URL");
    var api_url = "";
    app.get('/naverlogin', function (req, res) {
        api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirectURI + '&state=' + state;
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        res.end("<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
    });
    app.get('/callback', function (req, res) {
        code = req.query.code;
        state = req.query.state;
        api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
            + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
        var request = require('request');
        var options = {
            url: api_url,
            headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
        };
        request.get(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
                res.end(body);
            } else {
                res.status(response.statusCode).end();
                console.log('error = ' + response.statusCode);
            }
        });
    });
    app.listen(3000, function () {
        console.log('http://127.0.0.1:3000/naverlogin app listening on port 3000!');
    });
}*/

function facebook() {
        FB.init({
            appId: '1965751797081808',
            cookie: true,
            xfbml: true,
            version: 'v2.11'
        });

        FB.login(function(response) { // response 처리
            }, {scope: 'public_profile'});

        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                var accessToken = response.authResponse.accessToken;

                FB.api('/me', function (accessToken) {
                    var name = accessToken.name;
                    snsFbLogIn(name);
                    alert(name + '님, 어서오세요');
                });
            }
        });

    (function(d,s,id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        fjs.parentNode.insertBefore(js, fjs);
    } (document, 'script', 'facebook-jssdk'));
}

function window() {
    $('.main-window').fadeIn(400);
}

window();

$('.hta-file-select').on('click', function() {
    var fileInputId = $(this).attr('for');

    $('#' + fileInputId).click();
});

$('.header-menu-name').on('click', function () {
    var id = $(this).attr('id');
    location.href = '/' + id + '.html';
});

$('#index').on('click', function () {
    location.href = '/index.html';
});

$('#member-layout').on('click', function () {
    $.ajax({
        url: '/api/member/get',
        success: function (result) {
            openMemberLayer(result);
        }
    });
});

function openMemberLayer(memberInfo) {
    $('body').append('<div class="dark-layer"</div>');
    $('body').css('overflow', 'hidden');

    var memberLayer = require('../template/member-login.hbs');
    var memberLayerHtml = memberLayer(memberInfo);

    $('body').append(memberLayerHtml);

    scriptjs('//developers.kakao.com/sdk/js/kakao.js', function() {
    });

    scriptjs('//static.nid.naver.com/js/naverLogin_implicit-1.0.3.js', function () {
    });

    scriptjs('//connect.facebook.net/en_US/sdk.js', function () {

    });

    $('.header-sub').animate({
        right: '0px'
    }, {
        duration: 500,
        complete: function () {
            if (!memberInfo.login) {
                $('.toggle-btn').on('click', function () {
                    $('.member-join').toggle();
                    $('.member-login').toggle();
                });

                $('#member-join-btn').on('click', function () {
                    memberJoin();
                });

                $('#member-login-btn').on('click', function () {
                    memberLogIn();
                });

                $('.sign-up-sns-btns > li').on('click', function () {
                    var snsBtn = $(this);
                    joinUpSnsBtn(snsBtn);
                });

                $('#custom-login-btn').on('click', function () {
                    kakao();
                });

                $('#fb-login-btn').on('click', function () {
                    facebook();
                });
            }
            else {
                $('#member-user-logout-btn').on('click', function () {
                    memberLogOut();
                });
            }

            $('.dark-layer').on('click', function () {
                closeMemberLayer();
            });

            $('#drop-out').on('click', function () {
                withdraw();
            });

            $('body').on('keydown', function (event) {
                if (event.keyCode === 27) {
                    closeMemberLayer();
                }
            });
        }
    });
}


function joinUpSnsBtn(snsBtn) {
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
    var nickname = $('#member-join-nickname').val().trim();
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
    else if (!nickname) {
        alert('닉네임을 입력하세요');
        $('#member-join-nickname').focus();
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
            password: password,
            nickname: nickname
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

function memberLogIn() {
    var email = $('#member-email').val().trim();
    var password = $('#member-password').val().trim();

    if (!email) {
        alert('이메일을 입력하세요');
        $('#member-email').focus();

        return;
    }
    else if (!password) {
        alert('비밀번호를 입력하세요');
        $('#member-password').focus();
        return;
    }

    $.ajax({
        url: '/api/member/login',
        method: 'POST',
        data: {
            email: email,
            password: password
        },
        success: function (result) {
            alert(result.nickname + ' 님, 어서오세요');
            closeMemberLayer();
        },
        error: function (jqXHR) {
            alert(jqXHR.responseJSON.message);
        }
    });
}

function memberLogOut() {
    $.ajax({
        url: '/api/member/logout',
        success: function () {
            closeMemberLayer();
        }
    });
}

function snsLogIn(kakaoMember) {
    var name = kakaoMember.properties.nickname;

    $.ajax({
        url: '/api/member/snssignin',
        method: 'POST',
        data: {
            nickname: name
        },
        success: function (result) {
            closeMemberLayer();
        }
    });
}

function snsFbLogIn(name) {

    $.ajax({
        url: '/api/member/snssignin',
        method: 'POST',
        data: {
            nickname: name
        },
        success: function (result) {
            closeMemberLayer();
        }
    });
}

function ktLogOut() {
    Kakao.Auth.logout(function () {
        setTimeout(function () {
            refresh();
        }, 1000);
    });
}

function withdraw() {
   if (confirm('애니멀고를 탈퇴하시겠습니까?') == true) {
       $.ajax({
           url: '/api/member/dropout',
           method: 'POST',
           success: function (result) {
                closeMemberLayer();
           }
       });
   }
   else {
       closeMemberLayer();
   }
}

function addDropEvent(event, element) {
    /*event.preventDefault();*/

    var html = $(element).html();
    var dropdownTitle = $(element).parents('.btn-group').find('.dropdown-title');
    dropdownTitle.html(html);
}

module.exports= addDropEvent();