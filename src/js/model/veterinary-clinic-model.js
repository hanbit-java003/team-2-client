require('./common');
require('bootstrap');
require('../less/veterinary-clinic.less');
require('.model');

module.exports = [{
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
}];
