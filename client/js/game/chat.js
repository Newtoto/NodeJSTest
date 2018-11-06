var sendChat = function() {
    console.log(chatInput.value);

    // Stops old connection bug
    if(loggedIn)
        socket.emit("chat", chatInput.value);

    // Remove input to allow for more chats
    chatInput.value = "";
}