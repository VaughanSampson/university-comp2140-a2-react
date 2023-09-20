import {Transport, Part, now, start}  from "tone";
import {getInstrumentFromString} from "../data/instruments.js"

var selectedIntrument = getInstrumentFromString();

export function setInstrument(instrumentName){
    selectedIntrument = getInstrumentFromString(instrumentName);
}

export function playNote(note){
    selectedIntrument.triggerAttackRelease(note+"3", "8n", now()); 
}

export const toneTransport = Transport;

export var tonePart = new Part((time, note) => {
    selectedIntrument.triggerAttackRelease(note, "8n", time);
}, []).start(0);

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