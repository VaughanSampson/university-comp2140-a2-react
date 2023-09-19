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
        "F3": "F4.mp3",  
        "G3": "G4.mp3",  
        "A3": "A4.mp3",  
        "B3": "B4.mp3", 
        "C3": "C4.mp3", 
        "D3": "D4.mp3", 
        "E3": "E4.mp3", 
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