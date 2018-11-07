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

socket.on("gameStateUpdate", gameStateData => {
    updateGameState(gameStateData);
});

// News message type
socket.on('info', data => {
    console.log(data);
});

// Send message types
// Displays chat above player's head
var sendChat = function() {
    console.log(chatInput.value);

    socket.emit("chat", chatInput.value);
    // Remove input to allow for more chats
    chatInput.value = "";
}