// Detect keydown inputs
document.addEventListener("keydown", event => {
    var keyId = "";

    // Get key name from code
    switch (event.keyCode){
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
    
    if(loggedIn){
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
    console.log(loggedIn);
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