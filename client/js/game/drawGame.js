var canvas = null;
var context = null;

var fillstyles = [
    "green", "red", "yellow", "black", "blue", 
    "white", "purple", "pink", "grey", "orange" 
];

getGameCanvas = function(){
    console.log("getting canvas");
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    context.font = "30px Arial";
}

// Update positions
socket.on("newPosition", playerData => {
    context.clearRect(0, 0, 500, 500);
    for (var player in playerData) {
        var thisPlayer = playerData[player];
        var nameOffset = 10;
        context.beginPath();
        context.textAlign="center"; 
        // Draw player circle or sprite
        if(thisPlayer.playerImageSrc !== undefined && thisPlayer.playerImageSrc !== null)
        {
            var image = new Image();
            image.src = thisPlayer.playerImageSrc;
            context.drawImage(image, thisPlayer.x - thisPlayer.radius, thisPlayer.y - thisPlayer.radius, thisPlayer.radius * 2, thisPlayer.radius * 2);
        }
        else
        {
            context.arc(thisPlayer.x, thisPlayer.y, thisPlayer.radius, 0, 2 * Math.PI, false);
            // Select player's colour
            context.fillStyle = fillstyles[thisPlayer.number];
            context.fill();
            context.fillStyle = "#000";
            context.lineWidth = 5;
            context.strokeStyle = "#000";
        }
        // Draw player name
        context.font = "15px Arial";
        context.fillText(thisPlayer.displayName,thisPlayer.x, thisPlayer.y - thisPlayer.radius - nameOffset);
        context.stroke();
    }
})

