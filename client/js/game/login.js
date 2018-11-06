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

    // Create game canvas
    var parent = document.getElementById("game");
    // var canvas = document.createElement("canvas");
    // newElement.setAttribute("id", "canvas");
    parent.innerHTML = '<canvas id="canvas" width = "500" height = "500" style = "border:1px solid #000;"></canvas><input id = "chatInput" type="text" maxlength="20"/><button id = "sendChatButton" onclick="sendChat()">Send</button>';
    // parent.appendChild(newElement);
    getGameCanvas();

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