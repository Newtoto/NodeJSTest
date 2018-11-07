// const hostname = '127.0.0.1'
const port = 3000;

// const fs = require('fs');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// How often the server refreshes positions (in ms)
const refreshSpeed = 10;

server.listen(port);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

// Keep track of all connected users
var socketList = {};
var loggedInSockets = {};

// Used to draw players on the game screen
var loggedInPlayers = {};

// Increments to keep unique usernames
var socketId = 0;

var newPlayer = (playerInfo) => {
    var self = {
        x: 250,
        y: 250,
        displayName: playerInfo.displayName,
        colour: playerInfo.colour,
        icon: playerInfo.icon,
        number: "" + Math.floor(10 * Math.random()),
        pressingUp: false,
        pressingDown: false,
        pressingLeft: false,
        pressingRight: false,
        speed: 2,
        radius: 20,
        chat: ""
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
        
        var playerInfo = {};

        // Extract player info from message data
        if (data.username == "")
            playerInfo.displayName = "Anonymous";
        
        playerInfo.colour = data.colour;
        playerInfo.icon = data.playerImageSrc;


        console.log("Logging in: " + playerInfo.displayName + " with socket ID " + socket.id);
        
        // Remember logged in state
        loggedIn = true;

        // Create player and add to logged in players
        player = newPlayer(playerInfo);
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
    socket.on('chat', message => {
        player.chat = message;
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
            colour: player.colour,
            x: player.x,
            y: player.y,
            number: player.number,
            radius: player.radius,
            chat: player.chat
        });
    }
    for(var socket in loggedInSockets) {
        var socket = loggedInSockets[socket];
        socket.emit("newPosition", package);
    }
}, refreshSpeed);