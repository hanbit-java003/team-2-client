require('bootstrap');
require('./common');
require('../less/clinic-details.less');

var loadGoogleMapsApi = require('load-google-maps-api-2');

loadGoogleMapsApi.key = 'AIzaSyA8LGiqeQNygYgQDoJPDOLMRcnW8o8HZeY';
loadGoogleMapsApi.language = 'ko';
loadGoogleMapsApi.version = '3';

var googleMap;
var map;

loadGoogleMapsApi().then(function (googleMaps) {
    googleMap = googleMaps;
    map = new googleMaps.Map($('#map')[0], {
        center: {
            lat: 37.502377,
            lng: 127.110190
        },
        scrollwheel: false,
        zoom: 18
    });
    var marker = new googleMaps.Marker({
        position: {
            lat: 37.502377,
            lng: 127.110190
        },
        map: map
    });
}).catch(function (error) {
    console.error(error);
});