require('./common');
require('bootstrap');
require('../less/caferesult.less');
require('./model/cafe-model');

/*var cafeModel = require('./model/cafe-model');*/

var cafeModel = {
    name: '구름뜬하늘',
    icons: [{
        icon: 'car'
    }, {
        icon: 'home'
    }, {
        icon: 'heart'
    }],
    location: {
        lat: 37.555087,
        lng: 126.926846
    },
    traffic: {
        bus: '153, 143, 162 승차 후 서강대학교 정류장에서 하차',
        subway: '2호선 신촌역 6번출구에서 600M',
        car: '홍대입구역에서 서교동교회 방면으로 5분'
    }
};

function initLocation() {
    $('.search-result-name').append(cafeModel.name);

    var resultIconTemplate = require('../template/cafe-result-icon.hbs');

    for (var i=0; i<cafeModel.icons.length; i++) {
        var resultIconHtml = resultIconTemplate(cafeModel.icons[i]);

        $('.search-result-icon').html(resultIconHtml);
    }

    var wayTraffic = $('#loc-traffic-cafe');
    wayTraffic.append('버스 : ' + cafeModel.traffic.bus + '<br>' +
        '지하철 : ' + cafeModel.traffic.subway);

    var wayCar = $('#loc-car-cafe');
    wayCar.append(cafeModel.traffic.car);

    var loadGoogleMapsApi = require('load-google-maps-api-2');

    loadGoogleMapsApi.key = 'AIzaSyA8LGiqeQNygYgQDoJPDOLMRcnW8o8HZeY';
    loadGoogleMapsApi.language = 'ko';
    loadGoogleMapsApi.version = '3';

    var googleMap;
    var map;

    loadGoogleMapsApi().then(function (googleMaps) {
        googleMap = googleMaps;
        map = new googleMaps.Map($('#map')[0], {
            center: cafeModel.location,
            scrollwheel: false,
            zoom: 18
        });
        var marker = new googleMaps.Marker({
            position: cafeModel.location,
            map: map,
            label: cafeModel.name
        });
    }).catch(function (error) {
        console.error(error);
    });
}

initLocation();