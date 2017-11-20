require('./common');
require('bootstrap');
require('../less/caferesult.less');
require('./model/cafe-detail/cafe-model');

/*var cafeModel = {
    id: 'cloud',
    name: '구름뜬하늘',
    icons: [{
        icon: 'car'
    }, {
        icon: 'home'
    }, {
        icon: 'heart'
    }],
    images: [{
        img: '../img/sky-1.jpg'
    }, {
        img: '../img/sky-2.jpg'
    }, {
        img: '../img/sky-3.jpg'
    }],
    infoDetail: [{
        info: '애견카페'
    }, {
        info: '카페음료로 계산: 7500원~'
    }, {
        info: '02)978-4567'
    }, {
        info: '12PM ~ 22PM 매월 셋째주 수요일 휴무'
    }, {
        info: '홍대'
    }, {
        info: '주차공간이 협소하오니 대중교통을 이용하시길 권합니다.'
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
};*/

var cafeModel = require('./model/cafe-detail/cafe-model');

function initCafeResult() {
    $('.search-result-name').append(cafeModel.name);

    var resultIconTemplate = require('../template/cafe/cafe-result-icon.hbs');

    for (var i=0; i<cafeModel.icons.length; i++) {
        var resultIconHtml = resultIconTemplate(cafeModel.icons[i]);

        $('.search-result-icon').append(resultIconHtml);
    }

    var resultImgTemplate = require('../template/cafe/cafe-result-img.hbs');

    for (var i=0; i<cafeModel.images.length; i++) {
        var resultImgHtml = resultImgTemplate(cafeModel.images[i]);

        $('.result-detail-list').append(resultImgHtml);
    }

    for (var i=0; i<cafeModel.infoDetail.length; i++) {
        var cafeInfoTemplate = require('../template/cafe/cafe-result-infos.hbs');

        cafeInfoHtml = cafeInfoTemplate(cafeModel.infoDetail[i]);
        $('.info-detail').append(cafeInfoHtml);
    }

    var wayTraffic = $('#loc-traffic-cafe');
    wayTraffic.append('버스' + '' + ':' + '' + cafeModel.traffic.bus + '<br>' +
        '지하철' + '' + ':' + '' + cafeModel.traffic.subway);

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

initCafeResult();