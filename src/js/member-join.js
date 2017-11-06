require('bootstrap');
require('./common');
require('../less/template/member-join.less');

$('.member-join').on('click', function() {
    location.href = './member-join.html';
});

$('#search-clinic').on('click', function() {
    location.href = 'veterinary-clinic.html';
});

$('.ac-tab-btns').on('click', function() {
   if($(this).hasClass('active')) {
       return;
   }
});
