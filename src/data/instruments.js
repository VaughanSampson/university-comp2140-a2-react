import {Sampler}  from "tone";
 


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

export const instruments = {
    "Guitar": guitar,
    "Piano": piano,
    "Cello": cello,
    "Harmonium": harmonium,
    "Drums": drums
}

export function getInstrumentFromString(string = "guitar"){
    return instruments[string];
}