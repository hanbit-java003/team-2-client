require('bootstrap');
require('./common');
require('../less/searchcafe.less');
require('./search-common/search');



var cafeModel = require('./model/cafe-detail/cafe-model');

function setList() {
    var cafeTemplate = require('../template/cafe/cafe-search-list.hbs');
    var cafeHtml = cafeTemplate(cafeModel);

    $('.search-result-list').append(cafeHtml);
}

setList();

$('.search-result-list > li').on('click', function () {
    location.href = './caferesult.html?id=cloud';
});