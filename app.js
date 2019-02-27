var express = require('express'),
    http = require('http'),
    path = require('path'),
    ioServer = require('socket.io'),
    app = express(),
    masterUser = 'username',
    masterPass = 'password',
    port = process.env.PORT || 3001;


app.use(express.static(path.join(__dirname, 'public')));

// Authentication
const auth = require('express-basic-auth')({
  users: { 'admin': 'supersecret' },
  challenge: true
});
 
app.get('/', auth, function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/client', function (req, res) {
    res.sendFile(__dirname + '/views/client.html');
});

var server = http.createServer(app).listen(port, function () {
    console.log("Express server listening on port "+port);
});

var io = ioServer.listen(server);
io.sockets.on('connection', function (socket) {
    socket.emit("message", "Welcome to Revealer");
    socket.on("slidechanged", function (data) {
        socket.broadcast.emit("slidechanged", data);
    });
});
