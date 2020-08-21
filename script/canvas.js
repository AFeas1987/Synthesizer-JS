let canvasDiv = document.querySelector('#canvas');
let context = document.querySelector('#myCanvas').getContext('2d');

const repaint = () => {
    context.beginPath();
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.stroke();
}

window.addEventListener('resize', () => {
    render();
    draw();
})

export const render = () =>
 {
    context.canvas.width = canvasDiv.offsetWidth;
    context.canvas.height = canvasDiv.offsetHeight;
}

export const draw = () => 
{
    repaint();
}

render();



