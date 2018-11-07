// Controls showing either game or login page

var loginDiv = document.getElementById("login");
var gameDiv = document.getElementById("game");

var enableGame = function(){
    gameDiv.setAttribute("style", "display: inline");
    loginDiv.setAttribute("style", "display: none");
}

var disableGame = function(){
    loginDiv.setAttribute("style", "display: inline");
    gameDiv.setAttribute("style", "display: none");
}