require('dotenv').config()
const express = require('express'),
      http = require('http'),
      path = require('path'),
      ioServer = require('socket.io'),
      app = express(),
      masterUser = 'username',
      masterPass = 'password',
      port = process.env.NODE_ENV === 'production' ? 3000 : 3001;

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));

// Authentication
const users = {};
users[process.env.USERNAME] = process.env.PASSWORD;
const auth = require('express-basic-auth')({
  users: users,
  challenge: true
});

app.get('/', function (req, res) {
  res.render('client');
});

app.get('/master', auth, function (req, res) {
  res.render('master');
});

const server = http.createServer(app).listen(port, function () {
  console.log("Express server listening on port " + port);
});

const io = ioServer.listen(server);
io.sockets.on('connection', function (socket) {
  socket.emit("message", "Welcome to Revealer");
  socket.on("slidechanged", function (data) {
    socket.broadcast.emit("slidechanged", data);
  });
});
