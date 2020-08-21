import * as sound from './script.js';

const TOGGLE_PAUSE_PLAY = document.querySelector('#play_pause');
const playPauseIcon = document.querySelector('#playPauseIcon');
let running = false;

TOGGLE_PAUSE_PLAY.addEventListener('click', () => {
    play();
})

const togglePlayPause = () => {
    (!running) 
    ? playPauseIcon.classList.replace('fa-play', 'fa-pause') 
    : playPauseIcon.classList.replace('fa-pause', 'fa-play')
  }

const play = () => {
    // if(!running) {
   

    if (sound.audioContext !== undefined) {
        sound.majorChordsDemo(57);
    }
    // }
  }
  
  const pause = () => {
    if (running) {
      togglePlayPause();
      running = !running;
    }
  }