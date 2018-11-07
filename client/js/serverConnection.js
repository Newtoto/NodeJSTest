// Log in player
const socket = io();

var Login = function(){
    // Get player info
    var data = GetPlayerInfo();
    // Send info to server
    socket.emit('loginPlayer', data);

    // Hide login div and show game div
    EnableGame();
}

// Received message types
// Disconnection
socket.on('disconnect', function(){
    // Hide game div and show login div
    DisableGame();
    console.log('Socket disconnected');
})

socket.on("gameStateUpdate", gameStateData => {
    UpdateGameState(gameStateData);
});

// News message type
socket.on('info', data => {
    console.log(data);
});

// Send message types
// Displays chat above player's head
var SendChat = function() {
    console.log(chatInput.value);

    socket.emit("chat", chatInput.value);
    // Remove input to allow for more chats
    chatInput.value = "";
}