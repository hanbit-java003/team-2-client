require('bootstrap');
require('../less/showoff-page.less');

var common = require('./common');

var showoffcont = require('./model/show-story');

function initShowoffcont(showoffcont) {
    var template = require('../template/show-story.hbs');

    $('.showoff-story').empty();

    for (var i=0; i<showoffcont.length; i++) {
        var html = template(showoffcont[i]);

        $('.showoff-story').append(html);
    }
}

initShowoffcont(showoffcont);