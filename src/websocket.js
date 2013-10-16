$('#sendBtn').on('click', function (e) {
    e.preventDefault();
    var name = '#{user}',
        msg = $('#msg').val();

    socket.emit("msg", '{"msg": "' + msg + '"}');
    $('#msg').val('');
});

socket.on('msg', function (msg) {

    var now = new Date();
    var hours = now.getHours();
    hours = (hours < 10) ? '0' + hours : hours;
    var minutes = now.getMinutes();
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    var time = hours + ':' + minutes;

    var data = JSON.parse(msg);

    var msg = '<div>' + time + ' - <b>' + data.name + '</b>: ' + data.msg + '</div>';

    saveHistory(msg);

    $('#msgs').append($(msg));
});

socket.on('join', function (msg) {
    var data = JSON.parse(msg);
    $('#users').empty();

    var names = Object.keys(data.users);

    var myPos = data.users['#{user}'];
    var myPos = {"lat": 48.3548753, "long": 11.7920352};

    for (var i = 0; i < names.length; i++) {

        var pos = data.users[names[i]];
        var distance = getDistance(pos.lat, pos.long, myPos.lat, myPos.long);

        var user = $('<div>' + names[i] + ' (' + distance + ')</div>');
        $('#users').append(user);

    }
});

var socket = io.connect('http://localhost:8080');
if (false) {
    socket.on('connect', function () {
        var geolocation = navigator.geolocation;

        geolocation.getCurrentPosition(function (pos) {
            var lat = pos.coords.latitude;
            var long = pos.coords.longitude;

            var data = {
                name: "#{user}",
                position: {
                    "lat": lat,
                    "long": long
                }
            }

            var data = JSON.stringify(data);
            getHistory();
            socket.emit("join", data);
        });
    });
} else {
    socket.on('connect', function () {
        var data = {
            name: "#{user}",
            position: {
                "lat": 52.525191,
                "long": 13.413883
            }
        }
        var data = JSON.stringify(data);
        getHistory();
        socket.emit("join", data);
    })
}