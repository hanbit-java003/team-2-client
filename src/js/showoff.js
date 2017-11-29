require('bootstrap');
require('../less/showoff.less');

var common = require('./common');


$('.showoff-write').on('click', function() {
    location.href = './showoff-write.html';
});

$.ajax({
    url: '/api/showoff/',
    success: function (result) {
        var showoffTemplate = require('../template/showoff-list.hbs');
        var showoffHtml = showoffTemplate(result);

        $('.pet-like-board-cont').append(showoffHtml);

        $('.pet-like-board-cont > li').on('click', function() {
            var showoffId = $(this).attr('showoffId');
            location.href = './showoff-page.html?id=' + showoffId;
        });
    }
});


/*var Search = require('./search-common/search');
var search = new Search($('#showoff-search-input'), setList());*/

/*function initShowoffList(showoffList) {
    var template = require('../template/showoff-list.hbs');

    $('.pet-like-board-cont').empty();

    for (var i=0; i<showoffList.length; i++) {
        var html = template(showoffList[i]);

        $('.pet-like-board-cont').append(html);
    }
}

initShowoffList(showoffList);

$('.pet-like-board-cont > li').on('click', function() {
    location.href = './showoff-page.html';
});*/

