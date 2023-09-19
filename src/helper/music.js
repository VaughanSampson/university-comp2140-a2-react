import {Transport, Part, now, start}  from "tone";
import {guitar, piano, cello, harmonium} from "../data/instruments.js"

var selectedIntrument = guitar;

export function setInstrument(instrumentName){
    switch(instrumentName){
        case "guitar":
            selectedIntrument = guitar;
            break;
        case "piano":
            selectedIntrument = piano;
            break;
        case "cello":
            selectedIntrument = cello;
            break;
        case "harmonium":
            selectedIntrument = harmonium;
            break;
        default:
            selectedIntrument = guitar;
    }
}

export const toneTransport = Transport;

export var tonePart = new Part((time, note) => {
    selectedIntrument.triggerAttackRelease(note, "8n", time);
}, []).start(0);

export function playNote(note, delay = 0){
    selectedIntrument.triggerAttackRelease(note+"3", "8n", now() + delay); 
}

export function playSequence(noteSequence, onEndCallback = null){
    tonePart.clear();
    toneTransport.cancel();

    noteSequence.forEach((element) => { 
        const note = Object.keys(element)[0];
        element[note].forEach((element, index) => {
            if(element) tonePart.add(index/4, note+"3");
        });

    });

    start();
    toneTransport.stop();
    toneTransport.start();

    if(onEndCallback)
    toneTransport.schedule(time => onEndCallback(), 4);
}

export function stopSequence(){
    toneTransport.stop();
}