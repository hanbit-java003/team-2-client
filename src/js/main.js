require('bootstrap');
require('../less/main.less');


var hello = require('./sample/hello');

$('.say-hello').on('click', function() {
    alert(hello.hello($('#txt-hello').val()));
});

$('.goto-sub').on('click', function() {
    location.href = 'sub.html';
});

$('#sign-in').on('click', function() {
    location.href = 'member-login.html';
});

$('#sign-up').on('click', function() {
    location.href = 'member-join.html';
});

$('#search-clinic').on('click', function() {
    location.href = 'veterinary-clinic.html';
});