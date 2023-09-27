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
    return json;
}

export async function deleteSample(id){
    const url = `${baseURL}sample/${id}/?api_key=${APIKEY}`;
    await fetch(url, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: {}
    });
}

export async function getLocations(){
    const url = `${baseURL}location/?api_key=${APIKEY}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
} 



export async function getAllSampleToLocations( ){ 
    const url = `${baseURL}sampletolocation/?api_key=${APIKEY}`;
    const response = await fetch(url);
    return await response.json(); 
}

export async function getOneSampleToLocationBySampleID(sampleID){ 
    const allSampleToLocations = await getAllSampleToLocations();   
    const sampleToLocation = allSampleToLocations.filter(element => element.sample_id == sampleID); 
    return sampleToLocation? sampleToLocation[0] : null; 
}
 
export async function deleteSampleToLocationBySampleID(sampleID){ 
    const sample = await getOneSampleToLocationBySampleID(sampleID);
    if(sample === null) return;
    const id = sample.id;
    const url = `${baseURL}sampletolocation/${id}/?api_key=${APIKEY}`;;
    await fetch(url, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        } 
    }); 
} 

export async function updateSampleToLocationBySampleID(sampleID, locationID){ 
    const sample = await getOneSampleToLocationBySampleID(sampleID);  

    const url = `${baseURL}sampletolocation${sample? `/${sample.id}` : ""}/?api_key=${APIKEY}`;
    const response = await fetch(url, {
        method: sample? 'PUT' : 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({sample_id: sampleID, location_id: locationID})
    });
    const json = await response.json();
    return json;
}
 


 