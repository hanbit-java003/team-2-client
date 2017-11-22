require('bootstrap');
require('./common');
require('../less/searchcafe.less');
require('./search-common/search');

var Search = require('./search-common/search');
var search = new Search($('#search-location-name-input'), setList);

//area id 로 가져와야 함

$.ajax({
    url: '/api/cafe/area',
    success: function (result) {
        var areaTemplate = require('../template/cafe/cafe-area.hbs');
        var areaHtml = areaTemplate(result);

        $('#search-location-gu .dropdown-menu').html(areaHtml);

        $('#search-location-gu .dropdown-menu a').on('click', function (event) {
            addDropdownEvent(event, this);

            var areaId = $(this).attr('area-id');
            requestList(areaId);
        });
    }
});

function requestList(areaId) {
    $.ajax({
        url: '/api/cafe/list',
        data: {
            areaId: areaId
        },
        success: function (result) {
            search.updateList(result);
        }
    });
}


function setList(cafe) {
    var cafeTemplate = require('../template/cafe/cafe-search-list.hbs');
    var cafeHtml = cafeTemplate(cafe);

    $('.search-result-list').html(cafeHtml);

    $('.search-result-list > li').on('click', function () {
        var cafeId = $(this).attr('cafe-id');
        location.href = './caferesult.html?id=' + cafeId;
    });
}

function addDropdownEvent(event, element) {
    event.preventDefault();

    var html = $(element).html();
    var dropdownTitle = $(element).parents('.btn-group').find('.dropdown-title');
    dropdownTitle.html(html);
}





