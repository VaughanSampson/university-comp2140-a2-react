const APIKEY = process.env.REACT_APP_SONGTRAX_KEY;
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

export async function postSample(sample){
    const url = `${baseURL}sample/?api_key=${APIKEY}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sample)
    });
    const json = await response.json();
    await alert(JSON.stringify(json) + " post");
    return json;
}

export async function putSample(sample, id){
    const url = `${baseURL}sample/${id}/?api_key=${APIKEY}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sample)
    });
    const json = await response.json();
    await alert(JSON.stringify(json) + " post");
    return json;
}
