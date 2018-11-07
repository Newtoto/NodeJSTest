// Store player info
var playerInfo = {};

// --- Custom player image ---
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

// --- Player colour selection ---
var charCreationCanvas = document.getElementById("charCreationCanvas");
var charCreationContext = charCreationCanvas.getContext("2d");

charCreationContext.fillStyle = "#000";
charCreationContext.strokeStyle = "#000";

var selectedCircle = 0;

// Caculates spacing
var circleMargin = 10;
var circleRadius = 20;
var leftOffsetX = circleMargin + circleRadius;
var topOffsetY = circleMargin + circleRadius;

var fillStyles = [
"green", "red", "yellow", "black", "blue", 
"white", "purple", "pink", "grey", "orange" 
];

var drawCircles = function(){
    charCreationContext.clearRect(0, 0, 550, 100);

    // Highlight selected cicle
    for(var i = 0; i < fillStyles.length; i++){
    charCreationContext.beginPath();
    charCreationContext.lineWidth = 1;
    if (i == selectedCircle){
        charCreationContext.lineWidth = 5;
    }
    charCreationContext.arc((circleRadius * 2 + circleMargin) * i + leftOffsetX, topOffsetY, circleRadius, 0, 2 * Math.PI, false);
    // Select colour
    charCreationContext.fillStyle = fillStyles[i];
    charCreationContext.fill();

    charCreationContext.stroke();
    };
};

drawCircles();

// Listen to player clicking on circles canvas
document.addEventListener('mousedown', event => {
    var rect = charCreationCanvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    
    // Make sure clicking is within y range of circles
    if(y > circleMargin && y < circleRadius * 2 + circleMargin){
        // Calculate selected colour number from spacing
        var colourNumber = Math.floor(x / ((circleRadius * 2) + circleMargin));
        
        if(colourNumber < fillStyles.length)
        {
            selectedCircle = colourNumber;
            console.log("You have selected circle: " + selectedCircle);
            drawCircles();
        }
    };
});

// --- Send user data ---

var getPlayerInfo = function() {
    // Get username
    playerInfo.displayName = document.getElementById("usernameInput").value;
    // Get icon
    if(playerImage !== null)
        playerInfo.icon = playerImage.src;
    // Get colour
    playerInfo.colour = fillStyles[selectedCircle];

    return playerInfo;
}