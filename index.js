var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var express = require('express');
var users = []

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log(socket.id)
    socket.on('new user', function (username) {
        var exist = false;
        if (nicknames.length != 0) {
            for (let i = 0; i < nicknames.length; i++) {
                if (nicknames[i].username == username) {
                    exist = true;
                    break;
                }
            }

        } else {
            exist = false;
        }
        if (!exist) {
            nicknames.push({ id: socket.id, username: username })
        }

        socket.emit("exist", exist)
       
    });


  socket.on('typing', function (typing) {
    socket.broadcast.emit('typing', typing)
  })

  socket.on('online', function (usernames) {
    users.push(usernames);
    io.emit("online",usernames)
    console.log(usernames);  

  });
});
app.use(express.static('public'));

http.listen(port, function () {
  console.log('listening on *:' + port);
});