// Log in player
const socket = io();

var login = function(){
    // Get player info
    var data = getPlayerInfo();
    // Send info to server
    socket.emit('loginPlayer', data);

    // Hide login div and show game div
    enableGame();
}

// Received message types
// Disconnection
socket.on('disconnect', function(){
    // Hide game div and show login div
    disableGame();
    console.log('Socket disconnected');
})

// News message type
socket.on('info', data => {
    console.log(data);
});