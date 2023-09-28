import { Transport, Part, now, start } from "tone";
import { getInstrumentFromString } from "../data/instruments.js"

var selectedIntrument = getInstrumentFromString();

/**
 * Sets the current instrument.
 * @param {string} instrumentName Name of instrument to use.
 */
export function setInstrumentWithName(instrumentName) {
    selectedIntrument = getInstrumentFromString(instrumentName);
}

/**
 * Plays a note with the selected instrument.
 * @param {string} note Name of note. 
 */
export function playNote(note) {
    selectedIntrument.triggerAttackRelease(note + "3", "8n", now());
}

// Create toneTransport and parts to handle playing a sequence of notes.
const toneTransport = Transport;
var tonePart = new Part((time, note) => {
    selectedIntrument.triggerAttackRelease(note, "8n", time);
}, []).start(0);

/**
 * Plays a sequence of notes.
 * @param {JSON} noteSequence The notes of a sample.
 * @param {void} onEndCallback Callback to inform caller when
 * playing is complete.
 */
export function playSequence(noteSequence, onEndCallback = null) {
    tonePart.clear();
    toneTransport.cancel();

    // Populate tonePart with notes.
    noteSequence.forEach((element) => {
        const note = Object.keys(element)[0];
        element[note].forEach((element, index) => {
            if (element) tonePart.add(index / 2, note + "3");
        });
    });

    // Stop and begin playing.
    start();
    toneTransport.stop();
    toneTransport.start();

    // Tell caller the sample is complete.
    if (onEndCallback) { toneTransport.schedule(() => onEndCallback(), 8); }
}

/**
 * Forces toneTransport to stop playing.
 */
export const stopSequence = () => toneTransport.stop();
