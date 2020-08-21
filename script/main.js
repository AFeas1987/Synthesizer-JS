import * as canvas from './canvas.js';
import * as controls from './controls.js'

const currentInterval = setInterval( () => {
    canvas.draw();
}, 1000)

