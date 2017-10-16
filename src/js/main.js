require('bootstrap');
require('../less/mainindex.less');
var hello = require('./sample/hello');

$('.say-hello').on('click', function() {
    alert(hello.hello($('#txt-hello').val()));
});

$('.goto-sub').on('click', function() {
    location.href = 'sub.html';
});
