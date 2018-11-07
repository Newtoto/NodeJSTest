var allowMovement = true;

var diableMovement = function() {
    allowMovement = false;

    // Sets all keypresses to false
    var keyIds = ["up", "left", "down", "right"];

    for (var i = 0; i < keyIds.length; i++)
    {
        socket.emit("keyPress", {
            inputId: keyIds[i], 
            state: false
        });
    }
}

// Detect clicking to chat
document.addEventListener('mousedown', event => {
    var focus = event.target;

    // Stop movement when typing in chat
    if(focus.id == "chatInput" && loggedIn)
        diableMovement();
    else
        allowMovement = true;
});

// Detect keydown inputs
document.addEventListener("keydown", event => {
    var keyId = "";

    // Get key name from code
    switch (event.keyCode){
        case 9:     // TAB (Disable movement if tab pressed to chat)
            diableMovement();
            break;
        case 13:    // Enter
            sendChat();
            break;
        case 87:    // W
            keyId = "up"
            break;
        case 38:    // Up arrow
            keyId = "up"
            break;
        case 65:    // A
            keyId = "left"
            break;
        case 37:    // Left arrow
            keyId = "left"
            break;
        case 83:    // S
            keyId = "down"
            break;
        case 40:    // Down arrow
            keyId = "down"
            break;
        case 68:    // D
            keyId = "right"
            break;
        case 39:    // Right arrow
            keyId = "right"
            break;
    }
    
    if(loggedIn && allowMovement){
        // Send pressed key to server
        socket.emit("keyPress", {
        inputId: keyId, 
        state: true
        });
    }    
});

// Detect keyup inputs
document.addEventListener("keyup", event => {
    var keyId = "";
    // Get key name from code
    switch (event.keyCode){
        case 87 || 38:    // W
            keyId = "up"
            break;
        case 38:    // Up arrow
            keyId = "up"
            break;
        case 65 || 37:    // A
            keyId = "left"
            break;
        case 37:    // Left arrow
            keyId = "left"
            break;
        case 83:    // S
            keyId = "down"
            break;
        case 40:    // Down arrow
            keyId = "down"
            break;
        case 68 || 39:    // D
            keyId = "right"
            break;
        case 39:    // Right arrow
            keyId = "right"
            break;
    }
    
    if(loggedIn){
        // Send pressed key to server
        socket.emit("keyPress", {
        inputId: keyId, 
        state: false
        });
    }
});