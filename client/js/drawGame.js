var canvas = null;
var context = null;
var chatInput = "";

// Get game canvas
canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

// Context settings
context.textAlign = "center"; 
context.fillStyle = "#000";
context.lineWidth = 5;
context.strokeStyle = "#000";

// Get chat input
chatInput = document.getElementById("chatInput");

// Update positions
var updateGameState = function(gamePlayerInfo){
    context.clearRect(0, 0, 1920, 1080);
    
    for (var player in gamePlayerInfo) {
        var currentPlayer = gamePlayerInfo[player];
        var nameOffset = currentPlayer.radius;
        var chatOffset = currentPlayer.radius / 2;

        
        // Draw player circle or sprite
        if(currentPlayer.playerImageSrc !== undefined && currentPlayer.playerImageSrc !== null)
        {
            var image = new Image();
            image.src = currentPlayer.playerImageSrc;
            context.drawImage(image, currentPlayer.x - currentPlayer.radius, currentPlayer.y - currentPlayer.radius, currentPlayer.radius * 2, currentPlayer.radius * 2);
        }
        else
        {
            context.beginPath();
            context.arc(currentPlayer.x, currentPlayer.y, currentPlayer.radius, 0, 2 * Math.PI, false);
            // Select player's colour
            context.fillStyle = currentPlayer.colour;
            context.fill();
            context.fillStyle = "#000";
            context.stroke();
        }
        // Draw player name
        context.font = "15px Arial";
        context.fillText(currentPlayer.displayName, currentPlayer.x, currentPlayer.y + currentPlayer.radius + nameOffset);
        // Draw player chat
        context.fillStyle = "#008080";
        context.fillText(currentPlayer.chat, currentPlayer.x, currentPlayer.y - currentPlayer.radius - chatOffset);
    }
}


