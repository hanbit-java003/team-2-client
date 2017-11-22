require('./common');
require('bootstrap');
require('../less/veterinary-clinic.less');
require('../js/model/veterinary-clinic-model');

var veterinaryClinicModel = {
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
};

var clinicModel = require('./model/clinic-detail/clinic-model');

var loadGoogleMapsApi = require('load-google-maps-api-2');

loadGoogleMapsApi.key = 'AIzaSyAP9lbmuHUeAFCcMBLQ3epj5_yBnb_oYOQ';
loadGoogleMapsApi.language = 'ko';
loadGoogleMapsApi.version = '3';

var googleMap;
var map;

loadGoogleMapsApi().then(function (googleMaps) {
    googleMap = googleMaps;
    map = new googleMaps.Map($('.location-24')[0], {
        center: {
            lat: 37.5023506,
            lng: 127.11023620000003
        },
        scrollwheel: false,
        zoom: 18
    });
    var marker = new googleMaps.Marker({
        position: {
            lat: 37.5023506,
            lng: 127.11023620000003,
        },
        map: map,
        label: veterinaryClinicModel.name
    });
/*    event.marker(marker, "mouseover", function() {
        marker = "<H3>여기는 잠실종합병원입니다."
    });*/

    }).catch(function (error) {
        console.error(error);
    });

$.ajax({
   url: 'api/clinic/' + clinicsId,
   success: function (result) {
       initClinic(result);
   }
});

function initClinic(model) {
    var lat = model.location.lat;
    var lng = model.location.lng;

    var apiKey = '9f51950dd945c485aa47e71554874096';
    var apiUrl =
        '?lat=' + lat +'&lon=' + lng +
        '&appid=' + apiKey +
        '&units=metric' +
        '&callback=?';

    $.getJSON(apiUrl, function (result) {

    });
}


