// const hostname = '127.0.0.1'
const port = 3000;

// const fs = require('fs');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// How fast the server refreshes positions (in ms)
const refreshSpeed = 5;

server.listen(port);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

var socketList = {};
var loggedInSockets = {};

var loggedInPlayers = {};

var socketId = 0;

var newPlayer = (username, displayName, playerImageSrc) => {
    var self = {
        x: 250,
        y: 250,
        username: username,
        displayName: displayName,
        playerImageSrc: playerImageSrc,
        number: "" + Math.floor(10 * Math.random()),
        pressingUp: false,
        pressingDown: false,
        pressingLeft: false,
        pressingRight: false,
        speed: 2,
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

    // Tell player about successfull connection
    socket.emit('connect');

    var loggedIn = false;
    var player = null;

    // Use socketId and increment for unique IDs
    socket.id = socketId;
    socketId ++
    // Add to all sockets
    socketList[socket.id] = socket;

    socket.number = "" + Math.floor(10 * Math.random());

    // Send message to all players
    io.emit('info', 'User connected');
    
    socket.on("loginPlayer", data => {
        
        var username = data.username;
        var playerImageSrc = data.playerImageSrc;

        console.log("Logging in: " + username);
        console.log("Player image: " + playerImageSrc);

        // Display as anonymous if no username set
        if (username == "")
            username = "Anonymous";
        
        // Save username as display name without socket id
        displayName = username;

        // Append socketId to username
        username += socket.id;
        
        console.log("Logging in user: " + username);
        
        // Remember logged in state
        loggedIn = true;

        // Add player to logged in players
        player = newPlayer(username, displayName, playerImageSrc);
        loggedInPlayers[socket.id] = player;

        // Add socket to logged in sockets
        loggedInSockets[socket.id] = socket;
    })


    // Handle player disconnection
    socket.on("disconnect", function(){
        // Remove socket from all sockets list
        delete socketList[socket.id];

        if(loggedIn) {
            // Remove socket from logged in sockets
            delete socketList[socket.id];
            // Remove player from list
            delete loggedInPlayers[socket.id];
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
            displayName: player.displayName,
            playerImageSrc: player.playerImageSrc,
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
}, refreshSpeed);