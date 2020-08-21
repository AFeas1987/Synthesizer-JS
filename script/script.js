let audioContext;

try {
    audioContext = new(window.AudioContext || window.webkitAudioContext)();
} catch (error) {
    // console.log(error);
    console.log("Browser does not support the Web Audio API");
}

const noteNames = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];
const lengthNames = [
                        'Sixteenth'
                        , 'Eigth'
                        , 'Quarter'
                        , 'Half'
                        , 'Whole'
                    ];
//Check if browser supports the audioContext API

const scales = [
    {
        name: 'Major',
        func: majorScale,
        
    }
]


majorScale.size = 7;
minorScale.size = 7;
bluesScale.size = 6;
pentatonicScale.size = 5;

var measure = 0;
var tempo = 0.45;

const bpm = 8;

class Note {

    length = 0.5;

    constructor(val, length) {
        this.val = val;
        this.freq = val == -1 ? 0 : getFreq(val);
        if (length != undefined)
            this.length = length;
    }

    octave(val) {
        return new Note(this.val + 12 * val, this.length);
    }

}


//printNotes();

// window.addEventListener('click', () => {
//     try {
//         audioContext = new(window.AudioContext || window.webkitAudioContext)();
//     } catch (error) {
//         console.log("Browser does not support the Web Audio API");
//     }

//     if (audioContext !== undefined) {
// //        comfortablyNumb();
//     //    chordDemo(69, majorChord);
//     majorChordsDemo(57);
// //        arpDemo();
// //        scaleDemo(bluesScale);
// //        restDemo();
//         // fibsDemo();
//     }
// });

function fibsDemo() {
        var func;
        func = 
//            majorScale;
//            minorScale;
//            pentatonicScale;
            bluesScale;
        var note;
//        note = 72 - 12; // C
        note = 69 - 12; // A
        var notes = fib.cache.slice(1).map(i => new Note(func(note, ((i - 1) % func.size) + 1)).octave(randomOctave()));
        playNotesRandom(0, notes);
//        note = 69; // A
        note = 72; // C
        func = 
//            majorScale;
//            minorScale;
            pentatonicScale;
//            bluesScale;
        notes = fib.cache.slice(1).map(i => new Note(func(note, ((i - 1) % func.size) + 1)).octave(randomOctave()));
        playNotesRandom(0, notes);
}

function restDemo() {
    const A = 69;
    var partA = [
        new Note(A)
        , new Note(-1)
        , new Note(-1)
        , new Note(-1)
        , new Note(A)
        , new Note(-1)
        , new Note(-1)
        , new Note(-1)
            ];
    playNotes(0, partA);
}

function majorChordsDemo(root) {
    let time = 0;
    time += chordDemo(time, root, majorChord, 0.5)
    time += chordDemo(time, root + 2, minorChord, 0.5)
    time += chordDemo(time, root + 4, minorChord, 0.5)
    time += chordDemo(time, root + 5, majorChord, 0.5)
    time += chordDemo(time, root + 7, majorChord, 0.5)
    time += chordDemo(time, root + 9, minorChord, 0.5)
    time += chordDemo(time, root + 11, dimChord, 0.5)
    time += chordDemo(time, root + 12, majorChord, 0.5)
}

function chordDemo(time, note, chordFunc, length = 0.5) {
    return playChord(time, length, chordFunc(note));
}

let majorChord = note => {
    return [new Note(note), new Note(note + 4), new Note(note + 7)];
}

let minorChord = note => {
    return [new Note(note), new Note(note + 3), new Note(note + 7)];
}

let dimChord = note => {
    return [new Note(note), new Note(note + 3), new Note(note + 6)];
}


function arpDemo() {
    const A = 69;
    var partA = [
        new Note(A)
        , new Note(A + 4)
        , new Note(A + 7)
        , new Note(A + 4)
        , new Note(A)
            ];
    playNotes(0, partA);
}

function scaleDemo(func) {
    const A = 69;
    var i;
    console.log(func.size)
    var notes = []
    for (i = 1; i <= func.size; i++) {
        console.log(getNoteName(func(A, i)));
        notes.push(new Note(func(A, i)))
    }
    notes.push(new Note(A + 12));
    playNotes(0, notes);
}

function fib(n, undefined) {
    if (fib.cache[n] === undefined)
        fib.cache[n] = fib(n - 1) + fib(n - 2);
    return fib.cache[n];
}

fib.cache = [0, 1, 1];
fib(500);


function comfortablyNumb() {
    const A = 81;
    var partA = [
    new Note(A), new Note(A - 3), new Note(A - 5), new Note(A - 7)
            ];
    var partB = [
    new Note(A), new Note(A - 5), new Note(A - 7), new Note(A - 8)
            ];
    const C = A - 2;
    var partC = [
    new Note(C), new Note(C - 3), new Note(C - 5), new Note(C - 7)
            ];
    var partD = [
    new Note(C), new Note(C - 5), new Note(C - 7), new Note(C - 8)
            ];
    var vocalA = [
    new Note(A + 5, 0.25), new Note(A + 5, 0.5), new Note(A + 5, 0.5), new Note(A + 5, 0.5),
    new Note(A + 5, 0.5), new Note(A + 5, 0.5), new Note(A + 7, 0.25), new Note(A + 7, 0.75), new Note(A, 0.75)
            ];
    var vocalB = [
    new Note(A + 5, 0.25), new Note(A + 5, 0.75), new Note(A + 4, 0.25), new Note(A + 5, 0.5),
    new Note(A + 5, 0.5), new Note(A + 5, 0.5), new Note(A + 7, 0.25), new Note(A + 7, 1.25)
            ];
    var time;
    var vocalTime;
    vocalTime = playNotes(0.5, vocalA)
    vocalTime = playNotes(vocalTime + 3.5, vocalB)
    time = playNotes(0, partA)
    time = playNotes(time, partA)
    time = playNotes(time, partA)
    time = playNotes(time, partA)
    time = playNotes(time, partB)
    time = playNotes(time, partB)
    time = playNotes(time, partB)
    time = playNotes(time, partB)
    time = playNotes(time, partA)
    time = playNotes(time, partA)
    time = playNotes(time, partA)
    time = playNotes(time, partA)
    time = playNotes(time, partB)
    time = playNotes(time, partB)
    time = playNotes(time, partB)
    time = playNotes(time, partB)
    time = playNotes(time, partC)
    time = playNotes(time, partC)
    time = playNotes(time, partC)
    time = playNotes(time, partC)
    time = playNotes(time, partD)
    time = playNotes(time, partD)
    time = playNotes(time, partD)
    time = playNotes(time, partD)
    time = playNotes(time, partC)
    time = playNotes(time, partC)
    time = playNotes(time, partC)
    time = playNotes(time, partC)
    time = playNotes(time, partD)
    time = playNotes(time, partD)
    time = playNotes(time, partD)
    time = playNotes(time, partD)
}

function song_1() {
    var partA = [
    new Note(69), new Note(74), new Note(77),
    new Note(69), new Note(74), new Note(77),
    new Note(69), new Note(74),
    new Note(70), new Note(74), new Note(77),
    new Note(70), new Note(74), new Note(77),
    new Note(70), new Note(74),
    new Note(71), new Note(74), new Note(77),
    new Note(71), new Note(74), new Note(77),
    new Note(71), new Note(74),
    new Note(70), new Note(74), new Note(77),
    new Note(70), new Note(74), new Note(77),
    new Note(70), new Note(74),
            ];
    var partB = [
    new Note(45, 2), new Note(46, 2), new Note(47, 2), new Note(48, 2)
            ];
    var partC = [
    new Note(88, 2), new Note(82, 2), new Note(86, 2), new Note(88, 2)
            ];
    var partD = [
    new Note(82, 2), new Note(75, 2), new Note(81, 2), new Note(80, 2)
            ];
    var time;
    playNotes(0 + 0.05, partA)
    playNotes(0, partB);
    playNotes(0 + 0.0125, partC);
    time = playNotes(0 + 0.0125, partD);
}

function playNotes(start, notes) {
    var time = start;
    var prev = undefined;
    notes.forEach((note) => {
//        measure %= bpm;
//        var len = measure >= bpm - fromLengthName(lengthNames[-1]) ? bpm - measure : note.length;
//        note.length = len;
        playNote(note.freq, time, note.length * 7 / 16, prev == undefined ? undefined : prev.length);
        prev = note;
        time += note.length;
//        measure += note.length;
    });
    return time;
}

function playNotesRandom(start, notes) {
    var time = start;
    var prev = undefined;
    notes.forEach((note) => {
        measure %= bpm;
        var len = measure >= bpm - fromLengthName(lengthNames[-1]) * tempo ? bpm - measure : randomLength() * tempo;
        note.length = len;
        playNote(note.freq, time, len * 7 / 16, prev == undefined ? undefined : prev.length);
        prev = note;
        time += len;
        measure += len;
    });
    return time;
}

function playChord(start, length, notes) {
    notes.forEach(({
        freq
    }) => {
        playNote(freq, start, length * 15 / 16);
    });
    return length;
}

function getNoteName(note) {
    return noteNames[note % 12];
}

function getFreq(note) {
    return 440 * ((note < 69) ? Math.pow(1 / 2, Math.abs(note - 69) / 12) : Math.pow(2, (note - 69) / 12));
}

function randomLength() {
    var x = Math.floor((lengthNames.length - 1) * Math.random());
//    console.log(x, lengthNames[x]);
    return fromLengthName(lengthNames[x]);
//    return rng <= 0.25 ? 0.125 : rng <= 0.5 ? 0.25 : 0.5;
}

function randomOctave() {
    return Math.random() >= 0.25 ? 0 : Math.floor(3 * Math.random()) - 1;
}

function fromLengthName(length) {
    switch (length) {
        case 'Sixteenth':
            return 1 / 4;
        case 'Eigth':
            return 1 / 2;
        case 'Quarter':
            return 1;
        case 'Half':
            return 2;
        case 'Whole':
            return 4;
    }
}

function majorScale(tone, interval) {
    switch ((interval - 1) % majorScale.size) {
        case 0: // root note
            return tone;
        case 1: // second
            return tone + 2;
        case 2: // maj third
            return tone + 4;
        case 3: // fourth
            return tone + 5;
        case 4: // fifth
            return tone + 7;
        case 5: // sixth
            return tone + 9;
        case 6: // maj seventh
            return tone + 11;
    }
}

function minorScale(tone, interval) {
    var res = majorScale(tone + 3, interval + 5) - 12;
    console.log(getNoteName(res), res, tone, res < tone, res < tone ? res + 12 : res)
    return res < tone ? res + 12 : res;
}

function pentatonicScale(tone, interval) {
    switch ((interval - 1) % pentatonicScale.size) {
        case 0: // root note
            return tone;
        case 1: // second
            return tone + 2;
        case 2: // maj third
            return tone + 4;
        case 3: // fifth
            return tone + 7;
        case 4: // sixth
            return tone + 9;
    }
}

function bluesScale(tone, interval) {
    switch ((interval - 1) % bluesScale.size) {
        case 0: // root note
            return tone;
        case 1: // minor third
            return tone + 3;
        case 2: // fourth
            return tone + 5;
        case 3: // dim fifth
            return tone + 6;
        case 4: // fifth
            return tone + 7;
        case 5: // dom seventh
            return tone + 10;
    }
}

function printNotes() {
    var i;
    for (i = 0; i < 13; i++)
        console.log(getNoteName(69 + i), getFreq(69 + i));
}

function playNote(freq, start, length, prevLen) {
    var oscillator = audioContext.createOscillator();
    var gainNode = audioContext.createGain();
    var filter = audioContext.createBiquadFilter();
    gainNode.connect(audioContext.destination);
    oscillator.connect(audioContext.destination);
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + start);
    gainNode.gain.setValueAtTime(1, audioContext.currentTime);
    console.log(length)
    if (length != undefined && length != NaN)
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + start + (length * 3/16));
    if (prevLen != undefined)
        oscillator.frequency.exponentialRampToValueAtTime(freq, prevLen);
    if (freq > 0) {
        oscillator.start(audioContext.currentTime + start);
        oscillator.stop(audioContext.currentTime + start + length);
    }
//    oscillator.disconnect(audioContext.destination, audioContext.currentTime + start + length);
}

export {
    majorChordsDemo,
    audioContext
}
