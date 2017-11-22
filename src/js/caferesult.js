require('./common');
require('bootstrap');
require('../less/caferesult.less');
require('./searchcafe');

var URLSearchParams = require('url-search-params');
var params = new URLSearchParams(location.search);
var cafeId = params.get('id');

function initCafeResult(cafe) {
    $('.search-result-name').text(cafe.name);

    /*for (var i=0; i<model.icons.length; i++) {
        var resultIconTemplate = require('../template/cafe/cafe-result-icon.hbs');
        var resultIconHtml = resultIconTemplate(model.icons[i]);

        $('.search-result-icon').append(resultIconHtml);
    }*/

    for (var i=0; i<cafe.images.length; i++) {
        var resultTemplate = require('../template/cafe/cafe-result-img.hbs');
        var resultHtml = resultTemplate(cafe.images[i]);

        $('.result-detail-list').append(resultHtml);
    }

    for (var i=0; i<cafe.info.length; i++) {
        var cafeTemplate = require('../template/cafe/cafe-result-infos.hbs');
        var cafeHtml = cafeTemplate(cafe.info[i]);

        $('.info-detail').append(cafeHtml);
    }

    var wayTraffic = $('#loc-traffic-cafe');
    wayTraffic.append('버스' + '' + ':' + '' + cafe.traffic.bus + '<br>' +
        '지하철' + '' + ':' + '' + cafe.traffic.subway);

    var wayCar = $('#loc-car-cafe');
    wayCar.append(cafe.traffic.car);

    var loadGoogleMapsApi = require('load-google-maps-api-2');

    loadGoogleMapsApi.key = 'AIzaSyA8LGiqeQNygYgQDoJPDOLMRcnW8o8HZeY';
    loadGoogleMapsApi.language = 'ko';
    loadGoogleMapsApi.version = '3';

    var googleMap;
    var map;

    loadGoogleMapsApi().then(function (googleMaps) {
        googleMap = googleMaps;
        map = new googleMaps.Map($('#map')[0], {
            center: cafe.location,
            scrollwheel: false,
            zoom: 18
        });
        var marker = new googleMaps.Marker({
            position: cafe.location,
            map: map,
            label: cafe.name
        });
    }).catch(function (error) {
        console.error(error);
    });
}

$.ajax({
    url: '/api/cafe/' + cafeId,
    success: function (result) {
        initCafeResult(result);
    }
});
