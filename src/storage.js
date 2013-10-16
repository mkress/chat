var saveHistory = function (line) {
    if (localStorage.length > 10) {
        for (var i = 1; i < 11; i++) {
            localStorage.setItem(i, '');
        }
    }
    for (var i = 10; i > 1; i--) {
        localStorage.setItem(i, localStorage.getItem(i - 1));
    }
    localStorage.setItem(1, line);
};

var getHistory = function () {
    for (var i = 10; i > 0; i--) {
        var item = localStorage.getItem(i);
        if (item !== 'null') {
            $('#msgs').append(item);
        }
    }
}