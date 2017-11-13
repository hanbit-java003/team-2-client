require('../less/infoTip.less');
require('bootstrap');
require('./common');

var common = require('./common');

var infoTipList = require('./model/infoTip-list');

function  initInfoTipList(infoTipList) {
    var template = require('../template/infoTip-list.hbs');

    $('.infoTip-body').empty();

    for(var i=0; i<infoTipList.length; i++) {
        var html = template(infoTipList[i]);

        $('.infoTip-body').append(html);
    }
}

initInfoTipList(infoTipList);