require('./common');
require('bootstrap');
require('../less/veterinary-clinic.less');

var veterinaryClinicModel = {
    name: '이룸 동물병원',
    location: {
        lat: 37.566535,
        lng: 126.97796919999996
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
            lat: 37.5010859,
            lng: 127.09715200000005
        },
        scrollwheel: false,
        zoom: 17
    });
    var marker = new googleMaps.Marker({
        position: {
            lat: 37.5010859,
            lng: 127.09715200000005,
        },
        map: map,
        label: veterinaryClinicModel.name
    });
}).catch(function (error) {
    console.error(error);
});
