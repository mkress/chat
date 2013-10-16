var express = require('express');
var app = express();

app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.cookieSession({secret: 'mySecret'}));
app.use(express.logger());

var dir = __dirname + '/public';
app.use('/public', express.static(dir));

function checkAuth(req, res, next) {
    if (!req.session.user) {
        res.redirect('/');
    } else {
        next();
    }
}

app.get('/', function (req, res) {
    if (req.session.user) {
        res.redirect('/chat');
    }

    res.render('login');
});

app.post('/login', function (req, res) {
    var user = req.body.username,
        pw = req.body.password;

    if (user === 'u1' && pw === 'test') {
        req.session.user = 'u1';
    } else if (user === 'u2' && pw === 'test') {
        req.session.user = 'u2';
    }

    res.redirect('/chat');
});

app.get('/logout', function (req, res) {
    var names = Object.keys(connections);
    names.splice(names.indexOf(req.session.user), 1);

    var msg = '{"names": ["' + names.join('","') + '"]}';

    if (connections[req.session.user] && connections[req.session.user].socket) {
        connections[req.session.user].socket.broadcast.emit('join', msg);
        connections[req.session.user].socket.disconnect();
    }
    delete connections[req.session.user];
    delete req.session.user;

    res.redirect('/');
});

app.get('/chat', checkAuth, function (req, res) {
    res.render('chat', {user: req.session.user});
});

var http = require('http');
var server = http.createServer(app);
server.listen(8080);
var io = require('socket.io').listen(server);

var connections = {};

function getName (connections, socket) {
    "use strict";
    
    var name, key;

    for (key in connections) {
        if (socket === connections[key].socket) {
            name = key;
        }
    }

    return name;
}

io.sockets.on('connection', function (socket) {

    socket.on('msg', function(message) {
        var data = JSON.parse(message),
            name = getName(connections, socket);

        var msg = '{"name": "' + name + '", "msg":"' + data.msg + '"}';

        socket.emit('msg', msg);
        socket.broadcast.emit('msg', msg);
    });

    socket.on('join', function(message) {
        var data = JSON.parse(message),
            name = getName(connections, socket);

        connections[data.name] = {"socket": socket, "position": data.position};

        var message = {};

        var names = Object.keys(connections);

        for (var i = 0; i < names.length; i++) {
            message[names[i]] = connections[names[i]].position;
        }

        var msg = '{"users": ' + JSON.stringify(message) + '}';

        socket.emit('join', msg);
        socket.broadcast.emit('join', msg);
    });

});