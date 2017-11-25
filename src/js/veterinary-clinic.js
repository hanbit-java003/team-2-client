require('./common');
require('bootstrap');
require('../less/veterinary-clinic.less');
require('../js/model/veterinary-clinic-model');

var Search = require('./search-common/search');
var search = new Search($('#search-location-name-input'), setList);

/*var veterinaryClinicModel = {
    name: '잠실종합동물병원',
    location: {
        lat: 37.5023506,
        lng: 127.11023620000003
    },
    way : {
        view: {
            loadview: '거리뷰',
            loadsearch: '길찾기'
        },
        telephone: '02-419-7580',
        address:'서울 송파구 삼학사로 44 보라빌딩 1층'
    }
};*/

$.ajax({
   url: '/api/clinic/area',
   success: function (result) {
       var areaTemplate = require('../template/cafe/cafe-area.hbs');
       var areaHtml = areaTemplate(result);

       $('#search-location-gu .dropdown-menu').html(areaHtml);
       $('#search-location-gu .dropdown-menu a').on('click', function (event) {
           addDropEvent(event, this);

           var areaId = $(this).att('area-id');
           requestList(areaId);
       });
   }
});

function requestList(areaId) {
    $.ajax({
        url: '/api/clinic/list',
        data: {
            areaId: areaId
        },
        success: function (result) {
            search.updateList(result);
        }
    });
}

function setList(clinic) {
    var template = require('../template/clinic/clinic-search-list.hbs')
    var html = template(clinic);

    $('.clinic-result-list').html(html);

    $('.clinic-result-list > li').on('click', function () {
        var clinicId = $(this).attr('clinic-id');
        location.href = './clinic-details.html?id=' + clinicId;
    });
}


var clinicId = params.get('id');

function initClinic(model) {
    var loadGoogleMapsApi = require('load-google-maps-api-2');
    var googleMap;
    var map;
    var lat = model.lat;
    var lng = model.lng;

    loadGoogleMapsApi.key = 'AIzaSyAP9lbmuHUeAFCcMBLQ3epj5_yBnb_oYOQ';
    loadGoogleMapsApi.language = 'ko';
    loadGoogleMapsApi.version = '3';

    loadGoogleMapsApi().then(function (googleMaps) {
        googleMap = googleMaps;
        map = new googleMaps.Map($('.location-24')[0], {
            center: {
                lat: lat,
                lng: lng
            },
            scrollwheel: false,
            zoom: 18
        });
        var marker = new googleMaps.Marker({
            position: {
                lat: lat,
                lng: lng
            },
            map: map,
            label: model.name
    });
    }).catch(function (error) {
        console.error(error);
    });
}

$.ajax({
    url: '/api/clinic/' + clinicId,
    success: function (result) {
        initClinic(result);
    }
});