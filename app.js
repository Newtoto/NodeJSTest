// const hostname = '127.0.0.1'
const port = 3000;

// const fs = require('fs');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('Scores');

db.serialize(function () {
//   db.run('CREATE TABLE lorem (info TEXT)');
//   var stmt = db.prepare('INSERT INTO lorem VALUES (?)');

//   for (var i = 0; i < 10; i++) {
//     stmt.run('Ipsum ' + i);
//   }

//   stmt.finalize();

  db.each('SELECT rowid AS id, info FROM lorem', function (err, row) {
    console.log(row.id + ': ' + row.info);
  });
});

db.close()
// const angular = require('angular').Server(app);

server.listen(port);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

var socketList = {};
var loggedInSockets = {};

var loggedInPlayers = {};

var newPlayer = username => {
    var self = {
        x: 250,
        y: 250,
        username: username,
        number: "" + Math.floor(10 * Math.random()),
        pressingUp: false,
        pressingDown: false,
        pressingLeft: false,
        pressingRight: false,
        speed: 1,
        radius: 20

    }
    self.updatePosition = function() {
        if(self.pressingUp)
            self.y -= self.speed;
        if(self.pressingDown)
            self.y += self.speed;
        if(self.pressingLeft)
            self.x -= self.speed;
        if(self.pressingRight)
            self.x += self.speed;
    }
    return self;
}

// Handle messages
io.on('connection', (socket) => {

    var loggedIn = false;
    var player = null;

    // Add to all sockets
    socket.id = Math.random();
    socketList[socket.id] = socket;

    socket.number = "" + Math.floor(10 * Math.random());

    // Send message to all players
    io.emit('info', 'User connected');
    
    // Message types
    // Handle player connection
    // socket.on('connectedPlayer', playerInfo => {
    //     // Create socket and add to list
    //     socket.id = Math.random();
    //     socketList[socket.id] = socket;

    //     // Create player and add to list
    //     var player = newPlayer(socket.id);
    //     playerList[socket.id] = player;

    //     socket.number = "" + Math.floor(10 * Math.random());
    //     // Send message to player
    //     sendInfoMessageToSocket(socket, 'Welcome to the server');
    //     console.log(playerInfo);
    // });
    
    socket.on("loginPlayer", username => {
        console.log("Logging in user: " + username);
        // Save username to variable
        this.username = username;
        
        // Remember logged in state
        loggedIn = true;

        // Add player to logged in players
        player = newPlayer(username);
        loggedInPlayers[socket.id] = player;

        // Add socket to logged in sockets
        loggedInSockets[player.username] = socket;
    })


    // Handle player disconnection
    socket.on("disconnect", function(){
        // Remove socket from all sockets list
        delete socketList[socket.id];

        if(loggedIn) {
            // Remove socket from logged in sockets
            delete socketList[player.username];
            // Remove player from list
            delete loggedInPlayers[player.username];
        } 
    });

    // Handle keypresses
    socket.on("keyPress", data => {
        console.log("Key pressed: " + data.inputId);
        switch(data.inputId){
            case "up":
                player.pressingUp = data.state;
                break;
            case "down":
                player.pressingDown = data.state;
                break;
            case "left":
                player.pressingLeft = data.state;
                break;
            case "right":
                player.pressingRight = data.state;
                break;
        }
    })

    // Info received
    socket.on('globalMessage', message => {
        io.emit('info', message);
    });

    // Info received
    socket.on('simpleMessageToServer', data => {
        io.emit('info', data);
        console.log(data.msg);
    });
})

sendInfoMessageToSocket = function(socket, msg){
    socket.emit('info', msg);
}

setInterval(function(){
    // Package info of all players' info
    var package = [];
    for(var player in loggedInPlayers) {
        var player = loggedInPlayers[player];
        // Get movement of the player
        player.updatePosition();
        package.push({
            x: player.x,
            y: player.y,
            number: player.number,
            radius: player.radius
        });
    }
    for(var socket in loggedInSockets) {
        var socket = loggedInSockets[socket];
        socket.emit("newPosition", package);
    }
}, 1000/25);