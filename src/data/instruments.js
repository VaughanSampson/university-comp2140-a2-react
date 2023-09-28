import {Sampler}  from "tone";

/**
 * Defines all usable notes (C major).
 */
export const notesList = ['B', 'A', 'G', 'F', 'E', 'D', 'C'];

/**
 * Defines guitar instrument by samples.
 */
export const guitar = new Sampler({
    urls: {
        "F3": "F3.mp3",  
        "G3": "G3.mp3",  
        "A3": "A3.mp3",  
        "B3": "B3.mp3", 
        "C3": "C3.ogg", 
        "D3": "D3.mp3", 
        "E3": "E3.mp3", 
    },
    release: 1,
    baseUrl: "samples/guitar-acoustic/"
}).toDestination();

/**
 * Defines piano instrument by samples.
 */
export const piano = new Sampler({
    urls: {
        "F3": "F3.mp3",  
        "G3": "G3.mp3",  
        "A3": "A3.mp3",  
        "B3": "B3.mp3", 
        "C3": "C3.mp3", 
        "D3": "D3.mp3", 
        "E3": "E3.mp3", 
    },
    release: 1,
    baseUrl: "samples/piano/"
}).toDestination();

/**
 * Defines cello instrument by samples.
 */
export const cello = new Sampler({
    urls: {
        "F3": "F3.mp3",  
        "G3": "G3.mp3",  
        "A3": "A3.mp3",  
        "B3": "B3.mp3", 
        "C3": "C3.mp3", 
        "D3": "D3.mp3", 
        "E3": "E3.mp3", 
    },
    release: 1,
    baseUrl: "samples/cello/"
}).toDestination();

/**
 * Defines harmonium instrument by samples.
 */
export const harmonium = new Sampler({
    urls: {
        "F3": "F3.mp3",  
        "G3": "G3.mp3",  
        "A3": "A3.mp3",  
        "B3": "B3.mp3", 
        "C3": "C3.mp3", 
        "D3": "D3.mp3", 
        "E3": "E3.mp3", 
    },
    release: 1,
    baseUrl: "samples/harmonium/"
}).toDestination();

/**
 * Defines drums instrument by samples.
 */
export const drums = new Sampler({
    urls: {
        "F3": "drums1.mp3",  
        "G3": "drums2.mp3",  
        "A3": "drums3.mp3",  
        "B3": "drums4.mp3", 
        "C3": "drums5.mp3", 
        "D3": "drums6.mp3", 
        "E3": "drums7.mp3", 
    },
    release: 1,
    baseUrl: "samples/drums/"
}).toDestination();

/**
 * Defines all usable instruments by their name and object.
 */
export const instruments = {
    "Guitar": guitar,
    "Piano": piano,
    "Cello": cello,
    "Harmonium": harmonium,
    "Drums": drums
}

/**
 * Gets a musical instrument by its name.
 * @param {string} string Name of the musical instrument.
 * @returns The musical instrument with the given name, 
 * or guitar if the name matched no instrument.
 */
export function getInstrumentFromString(string = "guitar"){
    return instruments[string];
}