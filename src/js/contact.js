require('../less/contact.less');
var common = require('./common');

$('.contact-btn-send').on('click', function () {
   sendEmail();
});

function sendEmail() {
    var name = $('#contact-input-info-name').val().trim();
    var title = $('#contact-input-info-title').val().trim();
    var sender = $('#contact-input-info-email').val().trim();
    var subject = $('#contact-input-info-text').val().trim();

    if (!sender) {
        alert('이메일을 입력하세요');
        $('#contact-input-info-email').focus();
    }
    else if (!title) {
        alert('제목을 입력하세요');
        $('#contact-input-info-title').focus();
    }
    else if (!subject) {
        alert('내용을 입력하세요');
        $('#contact-input-info-text').focus();
    }

    $.ajax({
        url: '/api/send',
        method: 'POST',
        data: {
            name: name,
            title: title,
            sender: sender,
            subject: subject
        },
        success: function (result) {
            alert('정상적으로 발송되었습니다');
        },
        error: function (jqXHR) {
            alert('발송 중 오류가 발생했습니다');
        }
    });
}