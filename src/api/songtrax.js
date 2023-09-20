import fetch from 'node-fetch';
const APIKEY = process.env.PUBLIC_SONGTRAX_KEY;
const baseURL = 'https://comp2140.uqcloud.net/api/';

export async function getSamples(){
    const url = `${baseURL}sample/?api_key=${APIKEY}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

export async function getSample(id){
    const url = `${baseURL}sample/${id}/?api_key=${APIKEY}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}