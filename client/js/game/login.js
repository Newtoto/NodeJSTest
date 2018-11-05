// Log in player
var loggedIn = false;
const socket = io();

var login = function(){
    var username = document.getElementById("usernameInput").value;
    console.log(username);
    socket.emit('loginPlayer', username);
    loggedIn = true;

    // Delete login html
    var element = document.getElementById("login");
    element.parentNode.removeChild(element);

    // Create game canvas
    var parent = document.getElementById("game");
    // var canvas = document.createElement("canvas");
    // newElement.setAttribute("id", "canvas");
    parent.innerHTML = '<canvas id="canvas" width = "500" height = "500" style = "border:1px solid #000;"></canvas>';
    // parent.appendChild(newElement);
    getGameCanvas();

    // Received message types
    // Server confirms connection
    socket.on('connect', function() {
        
    })

    // Disconnection
    socket.on('disconnect', function(){
        loggedIn = false;
        console.log('Socket disconnected');
    })

    // News message type
    socket.on('info', data => {
        console.log(data);
    });
}