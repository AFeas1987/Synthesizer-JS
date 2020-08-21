let canvasDiv = document.querySelector('#canvas');

let context = document.querySelector('#myCanvas').getContext('2d');
context.canvas.width = canvasDiv.offsetWidth;
context.canvas.height = canvasDiv.offsetHeight;



context.beginPath();
context.fillStyle = "black";
context.fillRect(0, 0, context.canvas.width, context.canvas.height);
context.stroke();

context.beginPath();
context.fillStyle = "white";
context.arc(0, 0, 50, 0, 2 * Math.PI);
context.fill(); 