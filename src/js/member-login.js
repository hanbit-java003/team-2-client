require('./common');
require('bootstrap');
require('../less/member-login.less');

$('.member-join').on('click', function() {
    location.href = './member-join.html';
});

$('.new-member-tab-btns > li').on('click', function() {
    if ($(this).hasClass('active')) {
        return;
    }
});

$('.login-placeholder-email').on('click', function() {
    alert('이메일을 입력해주세요.');
});

$('.login-placeholder-password').on('click', function() {
    alert('비밀번호를 입력해주세요.');
});

$('.member-login').on('click', function() {

});