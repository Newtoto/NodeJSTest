var sendChat = function() {
    console.log(chatInput.value);

    socket.emit("chat", chatInput.value);

    // Remove input to allow for more chats
    chatInput.value = "";
}