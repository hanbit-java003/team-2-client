require('./common');
require('bootstrap');
require('../less/veterinary-clinic.less');

var Search = require('./search-common/search');
var search = new Search($('#search-location-name-input'), setList);

$.ajax({
   url: '/api/clinic/area',
   success: function (result) {
       var areaTemplate = require('../template/cafe/cafe-area.hbs');
       var areaHtml = areaTemplate(result);

       $('#search-location-gu .dropdown-menu').html(areaHtml);
       $('#search-location-gu .dropdown-menu a').on('click', function (event) {
           addDropEvent(event, this);

           var areaId = $(this).attr('area-id');
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
            getClinic(result);
        }
    });
}

function setList(clinic) {
    var template = require('../template/clinic/clinic-search-list.hbs');
    var html = template(clinic);

    $('.clinic-result-list').html(html);

    $('.clinic-result-list > li').on('click', function () {
        var clinicId = $(this).attr('clinic-id');
        location.href = './clinic-details.html?id=' + clinicId;
    });
}

var i;
var clinicMaps;
var loadGoogleMapsApi = require('load-google-maps-api-2');
var googleMap;
var infoWindow;

loadGoogleMapsApi.key = 'AIzaSyAP9lbmuHUeAFCcMBLQ3epj5_yBnb_oYOQ';
loadGoogleMapsApi.language = 'ko';
loadGoogleMapsApi.version = '3';

function initMap(position) {
    loadGoogleMapsApi().then(function (googleMaps) {
        googleMap = googleMaps;

        infoWindow = new googleMap.infoWindow();

        var mapOptions = {
            zoom: 18,
            scrollwheel: false,
            center: new googleMaps.LatLng(position.coords.latitude, position.coords.longitude)
    };

    clinicMaps = new googleMaps.Map($('.location-24')[0], mapOptions);

    for (i=0; i<clinicMaps.length; i++) {
        marker = new googleMaps.Marker({
            position: new googleMaps.LatLng(clinicMaps[i].lat, clinicMaps[i].lng),
            map: clinicMaps
        });
    }
}).catch(function (error) {
        console.error(error);
    });
    getClinic();
}

function getClinic(clinicArea) {
    var clinicId = clinicArea.id;
    console.log(clinicId);

    $.ajax({
        url: '/api/clinic/' + clinicId,
        success: function (result) {
            for (i=0; i< result.length; i++) {
                marker = new googleMap.Marker({
                    position: new googleMap.LatLng(result[i].lat, result[i].lng),
                    map: clinicMaps
                });
            }
            googleMap.event.addListener(marker, 'click', function (marker, i) {
                return function () {
                    infoWindow.setContent(result[i].name);
                    infoWindow.open(map, marker);
                }
            })(marker, i);
        }
    })
}

function addDropEvent(event, element) {
    /*event.preventDefault();*/

    var html = $(element).html();
    var dropdownTitle = $(element).parents('.btn-group').find('.dropdown-title');
    dropdownTitle.html(html);
}