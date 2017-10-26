require('./common');
require('bootstrap');
require('../less/veterinary-clinic.less');
require('.model');

module.exports = [{
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
        address:'서울특별시 송파구 송파대로 388 창영빌딩 1층 '
    }
}];
