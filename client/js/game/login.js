// Log in player
var loggedIn = false;
const socket = io();

// Custom player image
var playerImage = null;
    
var openFile = function(e) {
    playerImage = new Image();
    playerImage.onload = function(){
        // Player image loaded
    };

    // Make sure image has been selected
    if(e.target.files[0] !== undefined)
    {
        // Check file is smaller than 1MB
        if(e.target.files[0].size/1024/1024 > 0.5)
        {
            // Defult player to circle
            playerImage = null;
            // Alert player
            alert("File may not exceed 500KB");
        }
        else {
            playerImage.src =  URL.createObjectURL(e.target.files[0]);
        }
            
    }
    else
        playerImage = null;
};

var login = function(){
    // Gather player info
    var username = document.getElementById("usernameInput").value;
    var data = {};
    data.username = username;
    if(playerImage !== null)
        data.playerImageSrc = playerImage.src;

    // Send info to server
    socket.emit('loginPlayer', data);

    // Allows directional keypresses to be sent to server
    loggedIn = true;

    // Delete login html
    var element = document.getElementById("login");
    element.parentNode.removeChild(element);

    // Enable game div
    initialiseGame();

    // Received message types
    // Server confirms connection
    socket.on('connect', function() {
        
    })

    // Disconnection
    socket.on('disconnect', function(){
        // TODO - RELOAD LOGIN SCREEN
        loggedIn = false;
        console.log('Socket disconnected');
    })

    // News message type
    socket.on('info', data => {
        console.log(data);
    });
}