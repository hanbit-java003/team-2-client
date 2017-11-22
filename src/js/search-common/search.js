var hangul = require('hangul-js');
var _ = require('lodash');

function Search(searchinput, setListFunction) {
    var areaList = [];

    var inputbox = searchinput;
    var setList = setListFunction;

    addEvents();

    var searchTimer;
    var lastSearchTimer= _.now();

    this.updateList = function (orignList) {
        areaList = orignList;

        search();
    };

    function addEvents() {
        inputbox.on('keyup', function (event) {
            switch (event.keyCode) {
                case 27:
                    inputbox.val('');
                case 8:
                case 46: {
                    search();
                    break;
                }
            }
        });

        inputbox.on('paste cut', function (event) {
            setTimeout(search, 100);
        });


        inputbox.on('input', function () {
            clearTimeout(searchTimer);
            var delay = 200;
            var now = _.now();

            if (now - lastSearchTimer > 1000) {
                delay = 0;
            }

            searchTimer = setTimeout(function () {
                search();
            }, delay);
        });
    }

    function hangulSearch (text, keyword) {
        var disassembled = hangul.disassemble(keyword);
        var isChosung = true;

        for (var i=0; i<disassembled.length; i++) {
            if (!hangul.isCho(disassembled[i])) {
                isChosung = false;
                break;
            }
        }

        if (!isChosung) {
            return hangul.search(text, keyword) > -1;
        }

        var chosung = _.map(hangul.d(text, true), function (arr) {
            return arr[0];
        });

        return hangul.search(chosung, keyword) > -1;
    }

    function search() {
        var keyword = _.kebabCase(inputbox.val().toLowerCase());

        areaList.forEach(function (cafe) {
            if (cafe.cafeId.includes(keyword) || hangulSearch(cafe.name,keyword)) {
                delete cafe.hidden;
            }
            else {
                cafe.hidden = true;
            }
        });

        setList(areaList);

        lastSearchTimer = _.now();
    }
}

module.exports = Search;