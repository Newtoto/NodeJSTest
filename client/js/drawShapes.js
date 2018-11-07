var DrawCircle = function(x, y, radius, context){
    // x, y = centre
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fill();
    context.stroke();
}

var DrawSquare = function(x, y, diameter, context){
    // x, y = top left corner
    // Fill square
    context.fillRect(x, y, diameter, diameter);
    // Outline square
    context.strokeRect(x, y, diameter, diameter);
}

var DrawTriangle = function(x, y, size, context){
    // x, y = top left corner

    context.beginPath();
    // Move to top point of triangle
    context.moveTo(x + size/2, y);
    // Draw line to bottom right
    context.lineTo(x + size, y + size);
    // Draw line to bottom left
    context.lineTo(x, y + size);
    // Close up triangle
    context.closePath();

    context.fill();
    context.stroke();
}
