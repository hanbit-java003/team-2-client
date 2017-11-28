require('bootstrap');
require('../less/showoff.less');

var common = require('./common');
var Search = require('./search-common/search');
var search = new Search(setList());

var showoffList = require('./model/showoff-list');

/*function initShowoffList(showoffList) {
    var template = require('../template/showoff-list.hbs');

    $('.pet-like-board-cont').empty();

    for (var i=0; i<showoffList.length; i++) {
        var html = template(showoffList[i]);

        $('.pet-like-board-cont').append(html);
    }
}

initShowoffList(showoffList);*/

$('.showoff-write').on('click', function() {
    location.href = './showoff-write.html';
});

$('.pet-like-board-cont > li').on('click', function() {
    location.href = './showoff-page.html';
});

function requestList(showoffId) {
    $.ajax({
        url: '/api/showoff/list',
        success: function (result) {
            search.updateList(result);
        }
    });

}


function setList(showoff) {
    var showoffTemplate = require('../template/showoff-list.hbs');
    var showoffHtml = showoffTemplate(showoff);

    $('.pet-like-board-cont').html(showoffHtml);

    $('.pet-like-board-cont > li').on('click', function() {
        var showoffId = $(this).attr('showoffId');

        location.href = './showoff-page.html?id=' + showoffId;
    });
}