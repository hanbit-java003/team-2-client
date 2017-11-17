require('./common');
require('bootstrap');
require('../less/showoff.less');

var common = require('./common');

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

