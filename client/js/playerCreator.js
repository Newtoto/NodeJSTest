// Store player info
var playerInfo = {};

// --- Custom player image ---
var playerImage = null;
    
var OpenFile = function(e) {
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
var colourSelectCanvas = document.getElementById("colourSelectCanvas");
var colourSelectContext = colourSelectCanvas.getContext("2d");

colourSelectContext.fillStyle = "#000";
colourSelectContext.strokeStyle = "#000";

var selectedColour = 0;
var colours = [
"green", "red", "yellow", "black", "blue", 
"white", "purple", "pink", "grey", "orange" 
];

// Caculates spacing
var circleMargin = 10;
var circleRadius = 20;
var leftOffsetX = circleMargin + circleRadius;
var topOffsetY = circleMargin + circleRadius;


var DrawColours = function(){
    colourSelectContext.clearRect(0, 0, 550, 100);

    // Draw shape for each colour
    for(var i = 0; i < colours.length; i++){
        // Bold outline selected cicle
        colourSelectContext.lineWidth = 1;
        if (i == selectedColour){
            colourSelectContext.lineWidth = 5;
        }
        // Select colour
        colourSelectContext.fillStyle = colours[i];

        var x = (circleRadius * 2 + circleMargin) * i + leftOffsetX;
        var y = topOffsetY;

        // Default to circles
        if(shapes != undefined){
            if(shapes[selectedShape] == "circle")
                DrawCircle(x, y, circleRadius, colourSelectContext);
            else if(shapes[selectedShape] == "square")
                DrawSquare(x - circleRadius, y - circleRadius, circleRadius * 2, colourSelectContext);
            else if(shapes[selectedShape] == "triangle")
                DrawTriangle(x - circleRadius, y - circleRadius, circleRadius * 2, colourSelectContext);
        }
        else
            DrawCircle(x, y, circleRadius, colourSelectContext);
    };
};

DrawColours();

// Listen to player clicking on circles canvas
document.addEventListener('mousedown', event => {
    var rect = colourSelectCanvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    
    // Make sure clicking is within y range of circles
    if(y > circleMargin && y < circleRadius * 2 + circleMargin){
        // Calculate selected colour number from spacing
        var colourNumber = Math.floor(x / ((circleRadius * 2) + circleMargin));
        
        if(colourNumber < colours.length)
        {
            selectedColour = colourNumber;
            DrawColours();
            DrawShapes();
        }
    };
});

// --- Player shape selection ---
var shapeSelectCanvas = document.getElementById("shapeSelectCanvas");
var shapeSelectContext = shapeSelectCanvas.getContext("2d");

shapeSelectContext.fillStyle = "#000";
shapeSelectContext.strokeStyle = "#000";

var selectedShape = 0;
var shapes = [
    "circle", "square", "triangle"
];

var DrawShapes = function(){
    shapeSelectContext.clearRect(0, 0, 200, 100);

    shapeSelectContext.fillStyle = colours[selectedColour];

    for(var i = 0; i < shapes.length; i++){
        
        // Bold outline selected shape
        shapeSelectContext.lineWidth = 1;
        if (i == selectedShape){
            shapeSelectContext.lineWidth = 5;
        }

        var x = (circleRadius * 2 + circleMargin) * i + leftOffsetX;
        var y = topOffsetY;

        if(shapes[i] == "circle"){
            // Draw circle
            DrawCircle(x, y, circleRadius, shapeSelectContext);
        }
        else if (shapes[i] == "square"){
            // Draw square
            DrawSquare(x - circleRadius, y - circleRadius, circleRadius * 2, shapeSelectContext);
        }
        else if (shapes[i] == "triangle"){
            // Draw triangle
            DrawTriangle(x - circleRadius, y - circleRadius, circleRadius * 2, shapeSelectContext);
        }
    };
};

DrawShapes();

// Listen to player clicking on circles canvas
document.addEventListener('mousedown', event => {
    var rect = shapeSelectCanvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    
    // Make sure clicking is within y range of shapes
    if(y > circleMargin && y < circleRadius * 2 + circleMargin){
        // Calculate selected colour number from spacing
        var shapeNumber = Math.floor(x / ((circleRadius * 2) + circleMargin));
        
        if(shapeNumber < shapes.length)
        {
            selectedShape = shapeNumber;
            DrawShapes();
            DrawColours();
        }
    };
});

// --- Send user data ---

var GetPlayerInfo = function() {
    // Get username
    playerInfo.displayName = document.getElementById("usernameInput").value;
    // Get icon
    if(playerImage !== null)
        playerInfo.icon = playerImage.src;
    // Get colour
    playerInfo.colour = colours[selectedColour];
    // Get shape
    playerInfo.shape = shapes[selectedShape];

    return playerInfo;
}