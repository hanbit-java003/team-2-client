require('../less/showoff-write.less');

var UrlSearchParams = require('url-search-params');
var params = new UrlSearchParams(location.search);

var common = require('./common');

var model = {
    lists: []
};

var validId = false;
var photos = [];

function addPreview(url, saved) {
    var preview = $('<li><div class="showoff-photo-remove">X</div></li>');
    preview.attr('saved', saved);

    preview.css({
        'background-image': 'url(' + url + ')',
        'width': '50px',
        'height': '50px'
    });

    $('.showoff-photos').append(preview);

    $('.showoff-photos > li:last-child .showoff-photo-remove').on('click', function() {
        var photo = $(this).parent('li');

        var saved = photo.attr('saved') === 'true';
        var savedPhotoCount = model.photos ? model.photos.length : 0;

        var index = saved ? photo.index() : photo.index() - savedPhotoCount;

        if (saved) {
            model.photos[index] = '_removed_';
            photo.hide();
        }
        else {
            photos.splice(index, 1);
            photo.remove();
        }
    });
}

$('#showoff-img').on('change', function() {
    if (this.files.length === 0) {
        return;
    }

    for (var i=0; i<this.files.length; i++) {
        var file = this.files[i];

        if (!file.type.startsWith('image/')) {
            continue;
        }

        photos.push(file);

        var fileReader = new FileReader();

        fileReader.onload = function(event) {
            addPreview(event.target.result, false);
        };

        fileReader.readAsDataURL(file);
    }
});

$('.w-btn').on('click', function() {
    model.nickname = $('#showoff-writer').val().trim();
    model.password = $('#showoff-pw').val().trim();
    model.title = $('#showoff-title').val().trim();
    model.cont = $('#showoff-cont').val().trim();

    if (!model.nickname) {
        alert('닉네임을 입력하세요');
        return;
    }
    else if (!model.password) {
        alert('비밀번호를 입력하세요');
        $('#showoff-pw').focus();
        return;
    }
    else if (!model.title) {
        alert('제목을 입력하세요.');
        $('#showoff-title').focus();
        return;
    }
    else if (!photos.length && !_.filter(model.photos, function(value) {
            return value !== '_removed_';
        }).length) {
        alert('사진을 한개 이상 추가하세요.');
        return;
    }
    else if (!model.cont) {
        alert('소개를 입력하세요.');
        $('#showoff-cont').focus();
        return;
    }

    if (model.lists) {
        model.lists.forEach(function(list) {
            delete list.no;

            if (!list.items) {
                return;
            }

            list.items.forEach(function(item) {
                delete item.no;
            });
        });
    }

    delete model.there;

    var formData = new FormData();
    formData.append('model', JSON.stringify(model));

    photos.forEach(function(photo) {
        formData.append('photos', photo);
    });

    $.ajax({
        url: '/api/showoff/save',
        method: 'POST',
        contentType: false,
        processData: false,
        data: formData,
        success: function(result) {
            alert('정상적으로 저장되었습니다.');

            location.href = './showoff.html?no=' + model.no;
        },
        error: function() {
            alert('저장 중 오류가 발생하였습니다.');
        }
    });
});

$('.c-btn').on('click', function() {
    history.back();
});