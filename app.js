// const hostname = '127.0.0.1'
// const port = 3000;

// const fs = require('fs');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
// const angular = require('angular').Server(app);

server.listen(3000);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

io.on('connection', (socket) => {
    
    // Send message to all players
    io.emit('info', 'User connected');
    
    // Message types
    // Player connected
    socket.on('connectedPlayer', playerInfo => {
        // Send message to player
        sendInfoMessageToSocket(socket, 'Welcome to the server');
        console.log(playerInfo);
    })
    // Info received
    socket.on('globalMessage', message => {
        io.emit('info', message);
    })
})

sendInfoMessageToSocket = function(socket, msg){
    socket.emit('info', msg);
}