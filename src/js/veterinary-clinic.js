require('./common');
require('bootstrap');
require('../less/veterinary-clinic.less');

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
        telephone: '02-415-7585',
        address:'서울특별시 송파구 송파대로 388 창영빌딩 1층'
    }
};

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
        zoom: 17
    });
    var marker = new googleMaps.Marker({
        position: {
            lat: 37.5023506,
            lng: 127.11023620000003,
        },
        map: map,
        label: veterinaryClinicModel.name
    });
}).catch(function (error) {
    console.error(error);
});
