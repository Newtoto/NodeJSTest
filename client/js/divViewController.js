// Controls showing either game or login page

var loginDiv = document.getElementById("login");
var gameDiv = document.getElementById("game");

// Show game div, hide login div
var enableGame = function(){
    gameDiv.setAttribute("style", "display: inline");
    loginDiv.setAttribute("style", "display: none");
}

// Show login div, hide game div
var disableGame = function(){
    loginDiv.setAttribute("style", "display: inline");
    gameDiv.setAttribute("style", "display: none");
}