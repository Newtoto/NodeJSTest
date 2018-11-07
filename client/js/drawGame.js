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
var UpdateGameState = function(gamePlayerInfo){
    context.clearRect(0, 0, 1920, 1080);
    
    for (var player in gamePlayerInfo) {
        var currentPlayer = gamePlayerInfo[player];
        var nameOffset = currentPlayer.radius;
        var chatOffset = currentPlayer.radius / 2;
        
        // --- Draw players ---
        // Sprite images
        if(currentPlayer.playerImageSrc !== undefined && currentPlayer.playerImageSrc !== null)
        {
            var image = new Image();
            image.src = currentPlayer.playerImageSrc;
            context.drawImage(image, currentPlayer.x - currentPlayer.radius, currentPlayer.y - currentPlayer.radius, currentPlayer.radius * 2, currentPlayer.radius * 2);
        }
        // Shapes
        else
        {
            context.fillStyle = currentPlayer.colour;

            // Square
            if(currentPlayer.shape == "square")
                DrawSquare(currentPlayer.x - currentPlayer.radius, currentPlayer.y - currentPlayer.radius, currentPlayer.radius * 2, context);
            // Triangle
            else if (currentPlayer.shape == "triangle")
                DrawTriangle(currentPlayer.x - currentPlayer.radius, currentPlayer.y - currentPlayer.radius, currentPlayer.radius * 2, context);
            // Default to circle
            else 
                DrawCircle(currentPlayer.x, currentPlayer.y, currentPlayer.radius, context);
        }
        // Draw player name
        context.fillStyle = "#000";
        context.font = "15px Arial";
        context.fillText(currentPlayer.displayName, currentPlayer.x, currentPlayer.y + currentPlayer.radius + nameOffset);
        // Draw player chat
        context.fillStyle = "#008080";
        context.fillText(currentPlayer.chat, currentPlayer.x, currentPlayer.y - currentPlayer.radius - chatOffset);
    }
}


