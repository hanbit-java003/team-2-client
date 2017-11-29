require('bootstrap');
require('../less/showoff-page.less');

var common = require('./common');
var URLSearchParams = require('url-search-params');
var params = new URLSearchParams(location.search);
var storyId = params.get('id');

function detail(result) {
    var showStory = require('../template/show-story.hbs');
    var storyHtml = showStory(result);

    $('.showoff-story').append(storyHtml);
}

$.ajax({
    url: '/api/showoff/' + storyId,
    success: function (result) {
        detail(result);
    }
});