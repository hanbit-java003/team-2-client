require('bootstrap');
require('../less/showoff.less');

var common = require('./common');


$('.showoff-write').on('click', function() {
    location.href = './showoff-write.html';
});

var showoffList = require('./model/showoff-list');

function initShowoffList(showoffList) {
    var template = require('../template/showoff-list.hbs');

    $('.pet-like-board-cont').empty();

    for (var i=0; i<showoffList.length; i++) {
        var html = template(showoffList[i]);

        $('.pet-like-board-cont').append(html);
    }
}

initShowoffList(showoffList);


function setList(theres) {
    var showTemplate = require('../../template/showoff.hbs');
    var showHtml = showTemplate(theres);

    $('.pet-like-board-cont').html(showHtml);

    $('.pet-like-board-cont > li').on('click', function() {
        var thereId = $(this).attr('there-id');

        location.href = './there-info-edit.html?id=' + thereId;
    });
}